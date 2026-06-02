const { expect } = require('chai');
const sinon = require('sinon');
const mongoose = require('mongoose');
const Contact = require('../models/Contact');
const { addContact } = require('../controllers/contactController');

describe('ContactDex - AddContact Controller Unit Tests', () => {
  let req, res, createStub;

  beforeEach(() => {
    // Generate isolated mock request and token environment values
    req = {
      user: { id: new mongoose.Types.ObjectId().toString() },
      body: {
        firstName: 'John',
        lastName: 'Doe',
        role: 'Data Engineer',
        company: 'Opactiv',
        email: 'john.doe@opactiv.com',
        phone: '+61400000000',
        tags: ['SaaS', 'Vendor']
      }
    };

    // Configure spy objects to safely trap Express response status blocks
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };
  });

  afterEach(() => {
    // Always restore stubs cleanly to eliminate runtime pollution across assertions
    sinon.restore();
  });

  it('CD-16 Success: Should return 201 status and successfully create contact record', async () => {
    const mockCreatedContact = {
      _id: new mongoose.Types.ObjectId().toString(),
      ...req.body,
      userId: req.user.id,
      lastInteractedAt: null,
      noFollowUp: false
    };

    // Intercept database write layer to return synthetic transaction block
    createStub = sinon.stub(Contact, 'create').resolves(mockCreatedContact);

    await addContact(req, res);

    // Structural assertions evaluating controller outputs against user story limits
    expect(createStub.calledOnce).to.be.true;
    expect(res.status.calledWith(201)).to.be.true;
    expect(res.json.calledWith(mockCreatedContact)).to.be.true;
    expect(res.json.lastCall.args[0]).to.have.property('firstName', 'John');
  });

  it('CD-16 Failure: Should return 400 status if firstName attribute is omitted', async () => {
    req.body.firstName = ''; // Purge required parameter to trigger validation drop
    createStub = sinon.stub(Contact, 'create');

    await addContact(req, res);

    expect(createStub.called).to.be.false;
    expect(res.status.calledWith(400)).to.be.true;
    expect(res.json.lastCall.args[0]).to.have.property('message', 'First name is required.');
  });

  it('CD-16 Exception: Should catch unexpected system faults and fallback safely to status 500', async () => {
    // Simulate database network failures or cluster disconnections
    createStub = sinon.stub(Contact, 'create').throws(new Error('Atlas Database Connection Failure'));

    await addContact(req, res);

    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.lastCall.args[0]).to.have.property('message', 'Internal Server Error');
  });
});
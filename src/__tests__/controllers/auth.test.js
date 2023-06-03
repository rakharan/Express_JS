const { authRegisterController } = require('../../controllers/auth')
const User = require('../../database/schemas/User')
const { hashPassword } = require('../../utils/helpers')
jest.mock('../../utils/helpers', () => ({
    hashPassword: jest.fn((x) => x)
}))
jest.mock('../../database/schemas/User')

const req = {
    body: {
        email: 'fake_email@gmail.com',
        password: 'password'
    }
}

const res = {
    status: jest.fn((x) => x),
    send: jest.fn((x) => x)
}


it('should send a status code of 400 when user exists in DB', async () => {
    User.findOne.mockImplementationOnce(() => ({
        id: 1,
        email: 'email@gmail.com',
        password: 'password',
    }))
    await authRegisterController(req, res);
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.send).toHaveBeenCalledTimes(1)
})

it('should send a status code of 201 when new user is created', async () => {
    await authRegisterController(req, res);
    User.create.mockResolvedValueOnce({ id: 1, email: 'email', password: 'password' })
    await User.findOne.mockImplementationOnce(() => (
        undefined
    ))
    expect(hashPassword).toHaveBeenCalledWith('password')
    expect(User.create).toHaveBeenCalledWith({
        email: 'fake_email@gmail.com',
        password: 'password'
    })
    expect(res.send).toHaveBeenCalledWith(201)
})
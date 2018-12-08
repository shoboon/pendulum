import MockAdapter from 'axios-mock-adapter'

export default function({ $axios }) {
    const mock = new MockAdapter($axios, { delayResponse: 500 })

    mock.onGet('/numbered_tikect').reply(200, {
        numberedTikect: "550e8400e29b41d4a716446655440000"
    })

    mock.onGet('/waiting_users/550e8400e29b41d4a716446655440000').reply(200, {
        status: "admission"
    })
}
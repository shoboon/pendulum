import MockAdapter from 'axios-mock-adapter'

export default function({ $axios }) {
    const mock = new MockAdapter($axios, { delayResponse: 500 })

    mock.onGet('/numbered_ticket').reply(200, {
        numberedTicket: "550e8400e29b41d4a716446655440000"
    })

    mock.onGet('/waiting_users/550e8400e29b41d4a716446655440000').reply(200, {
        status: "admission",
        admissionTicket: 'a205cbb134ff412dc3212333448f1200'
    })

    mock.onGet('/battle_rooms/a205cbb134ff412dc3212333448f1200').reply(200, {
        status: "started",
    })

    mock.onGet('/battle_rooms/a205cbb134ff412dc3212333448f1200/fencers/type').reply(200, {
        type: "black",
    })
}
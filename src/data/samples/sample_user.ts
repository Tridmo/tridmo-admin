export interface sampleUserInterface {
    id: string,
    name: string,
    rank: number,
    username: string,
    image_src: string,
    email: string,
    phone_number: string,
    telegram: string,
    portfolio_link: string,
    created_at: string,

}

export const sampleUser: sampleUserInterface = {
    id: 'id',
    name: 'Mamatqul Masharipov',
    rank: 100,
    username: 'mamatqul_dizayn',
    image_src: '/img/profile.png',
    email: 'mamatqul@gmail.com',
    phone_number: '998990001122',
    telegram: '@mamatqul',
    portfolio_link: 'https://brand.com',
    created_at: new Date().toDateString(),

}
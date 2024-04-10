import { sampleBrand } from "./sample_brand";
import { sampleUser } from "./sample_user";

export const model = {
    id: `id`,
    top: true,
    brand_id: `brand_id`,
    category_id: `category_id`,
    model_platform_id: `model_platform_id`,
    render_platform_id: `render_platform_id`,
    interaction_id: `interaction_id`,
    file_id: `file_id`,
    style_id: `style_id`,
    name: `Model name`,
    description: `Ushbu mahsulot “NATUZZI” tomonidan ishlab chiqarilgan bo’lib 3D modelining o’lchami va ranglari asl mahsulot bilan bir xil yasalgan. Diqqat: vaqt o’tib mahsulot sotuvda qolmasligi yoki narxi o’zgarishi mumkin.`,
    slug: `slug`,
    furniture_cost: `7000000`,
    availability: `availability`,
    width: `400`,
    height: `200`,
    length: `50`,
    is_deleted: `is_deleted`,
    created_at: `${new Date()}`,
    file: {
        size: 5000000
    },
    brand: sampleBrand,
    model_platform: {
        name: '3ds Max 2018'
    },
    render_platform: {
        name: 'Corona | OBJ'
    },
    style: {
        name: 'Modern'
    },
    colors: [
        {
            color: { hex_value: '#040404' }
        }
    ],
    materials: [
        {
            material: { name: 'Teri' }
        }
    ],
    cover: [{ image: { src: '/img/models1.jpg' } }],

    images: [{
        image: { src: `/img/interior1.jpg` }
    }, {
        image: { src: `/img/interior2.jpg` }
    }, {
        image: { src: `/img/interior3.jpg` }
    }
    ]
}

export const sampleInterior = {
    id: 'id',
    category_id: 12,
    render_platform_id: 'rndrID',
    style_id: 2,
    interaction_id: 'intrID',
    name: 'Interior Name Something Anything',
    slug: 'interior_slug',
    is_deleted: false,
    created_at: `${new Date()}`,
    user: sampleUser,
    file: {
        size: 5000000
    },
    render_platform: {
        name: 'Corona | OBJ'
    },
    style: {
        name: 'Modern'
    },
    cover: [{ image: { src: '/img/interior1.jpg' } }],

    interior_models: [{
        model: model
    }, {
        model: model
    }, {
        model: model
    }],

    images: [{
        image: { src: `/img/interior1.jpg`, width: 1200, height: 1200 }
    }, {
        image: { src: `/img/interior2.jpg`, width: 1200, height: 1200 }
    }, {
        image: { src: `/img/interior3.jpg`, width: 1200, height: 1200 }
    }
    ]

}
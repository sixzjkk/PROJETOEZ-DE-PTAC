import express from 'express';
import cors from 'cors';
const app = express();
const port = 3000;

let skins = [
    {
        id: 1,
        image: "url_imagem_skin1",
        name: "Prime Vandal",
        weapon: "Vandal",
        price: "1775 VP",
        variants: ["Orange", "Blue", "Yellow"],
        rarity: "Premium"
    },
    {
        id: 2,
        image: "url_imagem_skin2",
        name: "Reaver Vandal",
        weapon: "Vandal",
        price: "1775 VP",
        variants: ["Purple", "White", "Black", "Red"],
        rarity: "Premium"
    },
    {
        id: 3,
        image: "url_imagem_skin3",
        name: "Glitchpop Frenzy",
        weapon: "Frenzy",
        price: "2175 VP",
        variants: ["Pink", "Gold", "Blue", "Red"],
        rarity: "Exclusive"
    },
    {
        id: 4,
        image: "url_imagem_skin4",
        name: "Sovereign Guardian",
        weapon: "Guardian",
        price: "1775 VP",
        variants: ["Golden", "Green", "Silver", "Purple"],
        rarity: "Premium"
    },
    {
        id: 5,
        image: "url_imagem_skin5",
        name: "Ion Phantom",
        weapon: "Phantom",
        price: "1775 VP",
        variants: ["Original"],
        rarity: "Premium"
    },
    {
        id: 6,
        image: "url_imagem_skin6",
        name: "Valorant Go! Vol. 1 Knife",
        weapon: "Melee (Knife)",
        price: "3550 VP",
        variants: ["Original"],
        rarity: "Premium"
    },
    {
        id: 7,
        image: "url_imagem_skin7",
        name: "Glitchpop Judge",
        weapon: "Judge",
        price: "2175 VP",
        variants: ["Pink", "Gold", "Blue", "Red"],
        rarity: "Exclusive"
    },
    {
        id: 8,
        image: "url_imagem_skin8",
        name: "Radiant Crisis 001 Phantom",
        weapon: "Phantom",
        price: "1775 VP",
        variants: ["Original"],
        rarity: "Premium"
    },
    {
        id: 9,
        image: "url_imagem_skin9",
        name: "Reaver Knife",
        weapon: "Melee (Knife)",
        price: "3550 VP",
        variants: ["Original"],
        rarity: "Premium"
    }
];

app.use(cors());
app.use(express.json());

app.get('/skins', (req, res) => {
    res.json({
        error: false,
        message: 'Search completed successfully.',
        data: skins
    });
});

app.get('/skins/:id', (req, res) => {
    const skin = skins.filter(skin => skin.id == req.params.id);
    res.json({
        error: false,
        message: 'Search completed successfully.',
        data: skin
    });
});

app.post('/skins', (req, res) => {
    const { image, name, weapon, price, variants, rarity } = req.body;
    const newSkin = {
        id: Date.now(),
        image,
        name,
        weapon,
        price,
        variants,
        rarity
    };
    skins = [...skins, newSkin]
    res.json({
        error: false,
        message: 'Skin added successfully.',
        data: newSkin
    });
});

app.put('/skins/:id', (req, res) => {
    skins.map(skin => {
        if (skin.id == req.body.id) {
            skin.name = req.body.name;
            skin.weapon = req.body.weapon;
            skin.image = req.body.image;
            skin.price = req.body.price;
            skin.variants = req.body.variants;
            skin.rarity = req.body.rarity;
        }
    })
    res.json({
        error: false,
        message: 'Skin changed successfully.',
        data: req.body
    })
});

app.delete('/skins/:id', (req, res) => {
    const id = req.params.id;
    const newSkins = skins.filter(skin => skin.id != id);
    skins = newSkins;
    res.json({
        error: false,
        message: 'Skin deleted successfully.',
        data: newSkins
    });
});

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
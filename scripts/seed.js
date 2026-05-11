// scripts/seed.js
db = db.getSiblingDB('bijouterie');
db.items.drop();

const matieres = ["Or", "Argent", "Platine", "Diamant"]; 
const types = ["Bague", "Collier", "Bracelet", "Boucles"];

// Ces liens sont des images directes et stables de haute qualité
const imagesFixes = {
    "Bague": "https://ca.pandora.net/dw/image/v2/AAVX_PRD/on/demandware.static/-/Sites-pandora-master-catalog/default/dwf042f40b/productimages/main_rect_center/198863C01_RGB.jpg?sw=750&sfrm=png&bgcolor=F7F7F7&q=70",
    "Collier": "https://ca.pandora.net/dw/image/v2/AAVX_PRD/on/demandware.static/-/Sites-pandora-master-catalog/default/dw56657970/productimages/main_rect_center/391229C01_RGB.jpg?sw=750&sfrm=png&bgcolor=F7F7F7&q=70",
    "Bracelet": "https://asset.swarovski.com/images/$size_2000/t_swa103/b_rgb:ffffff,c_scale,dpr_1.0,f_auto,w_2000/5734263_png/magic-bracelet--angel--blue--rhodium-plated-swarovski-5734263.png",
    "Boucles": "https://flammeenrose.com/cdn/shop/files/2302-Charmantes-2000x1400-Or-blanc-et-diamants_ecc330d0-4e17-42fe-8b74-7405be3a86d8_1080x.jpg?v=1774621129"
};

let bijoux = [];
for (let i = 1; i <= 50; i++) {
    const mat = matieres[i % 4];
    const type = types[i % 4];
    
    bijoux.push({
        name: `${type} Collection Prestige ${i}`,
        price: Math.floor(Math.random() * (2000 - 100) + 100),
        type: type,
        material: mat,
        imageUrl: imagesFixes[type], // Utilise l'image correspondante au type
        stock: Math.floor(Math.random() * 15) + 1,
        createdAt: new Date()
    });
}

db.items.insertMany(bijoux);
print("--- ✨ Catalogue LUXE 100% fonctionnel et synchronisé ! ---");
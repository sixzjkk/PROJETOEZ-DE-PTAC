import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import searchSkin from "../utils/searchSkin.jsx";
import { useNavigate } from "react-router-dom";

export default function Alter() {
  const navigation = useNavigate();
  const { id } = useParams();
  const [skin, setSkin] = useState();
  const [name, setName] = useState();
  const [weapon, setWeapon] = useState();
  const [image, setImage] = useState();
  const [price, setPrice] = useState();
  const [variants, setVariants] = useState([]);
  const [rarity, setRarity] = useState();

  useEffect(() => {
    const asyncFunction = async () => {
      const data = await searchSkin(setSkin, id);
      setName(data.name);
      setWeapon(data.weapon);
      setImage(data.image);
      setPrice(data.price);
      setVariants(data.variants);
      setRarity(data.rarity);
    }
    asyncFunction();
  }, [])

  const handleAlter = async (event) => {
    event.preventDefault();
    console.log(variants);
    const newSkin = {
      id: skin.id,
      name,
      image,
      weapon,
      price,
      variants,
      rarity
    };
    try {
      await fetch(`http://localhost:3000/skins/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newSkin)
      });
      alert('Skin changed successfully.')
      navigation('/');
    } catch (error) {
      console.error(error);
      alert('Error when changing.')
    }
  };

  return (
    <>
      <form onSubmit={handleAlter}>
        <label htmlFor="name">
          <input
            value={name}
            onChange={event => setName(event.target.value)}
          />
        </label>
        <label htmlFor="weapon">
          <input
            value={weapon}
            onChange={event => setWeapon(event.target.value)}
          />
        </label>
        <label htmlFor="image">
          <input
            value={image}
            onChange={event => setImage(event.target.value)}
          />
        </label>
        <label htmlFor="price">
          <input
            value={price}
            onChange={event => setPrice(event.target.value)}
          />
        </label>
        <label htmlFor="variants">
          <input
            value={variants}
            onChange={event => setVariants(event.target.value)}
          />
        </label>
        <label htmlFor="rarity">
          <select name="rarity" defaultValue={rarity} onChange={event => setRarity(event.target.value)}>
            <option value="Deluxe">Deluxe</option>
            <option value="Premium">Premium</option>
            <option value="Ultra">Ultra</option>
            <option value="Exclusive">Exclusive</option>
          </select>
        </label>
        <button>Alter</button>
      </form>
    </>
  );
};
import { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [klanten, setKlanten] = useState([]);
  const [nieuweKlant, setNieuweKlant] = useState({ naam: "", adres: "", postcode: "", huisnummer: "" });

  useEffect(() => {
    haalKlantenOp();
  }, []);

  const haalKlantenOp = async () => {
    try {
      const res = await axios.get("https://mbd-backend.onrender.com/api/klanten");
      setKlanten(res.data);
    } catch (err) {
      console.error("Fout bij ophalen klanten:", err);
    }
  };

  const voegKlantToe = async () => {
    try {
      await axios.post("https://mbd-backend.onrender.com/api/klanten", {
        id: crypto.randomUUID(),
        ...nieuweKlant,
      });
      setNieuweKlant({ naam: "", adres: "", postcode: "", huisnummer: "" });
      haalKlantenOp();
    } catch (err) {
      console.error("Klant toevoegen mislukt:", err);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">MBD Klantenbeheer</h1>

      <div className="mb-6">
        <h2 className="font-semibold mb-2">Nieuwe klant toevoegen</h2>
        <input
          className="border p-2 w-full mb-2"
          placeholder="Naam"
          value={nieuweKlant.naam}
          onChange={(e) => setNieuweKlant({ ...nieuweKlant, naam: e.target.value })}
        />
        <input
          className="border p-2 w-full mb-2"
          placeholder="Adres"
          value={nieuweKlant.adres}
          onChange={(e) => setNieuweKlant({ ...nieuweKlant, adres: e.target.value })}
        />
        <div className="flex gap-2">
          <input
            className="border p-2 w-full"
            placeholder="Postcode"
            value={nieuweKlant.postcode}
            onChange={(e) => setNieuweKlant({ ...nieuweKlant, postcode: e.target.value })}
          />
          <input
            className="border p-2 w-full"
            placeholder="Huisnummer"
            value={nieuweKlant.huisnummer}
            onChange={(e) => setNieuweKlant({ ...nieuweKlant, huisnummer: e.target.value })}
          />
        </div>
        <button onClick={voegKlantToe} className="mt-3 bg-blue-600 text-white px-4 py-2 rounded">
          Toevoegen
        </button>
      </div>

      <h2 className="font-semibold mb-2">Geregistreerde klanten</h2>
      <ul className="divide-y border rounded">
        {klanten.map((klant) => (
          <li key={klant.id} className="p-3">
            <strong>{klant.naam}</strong> – {klant.adres}, {klant.postcode} {klant.huisnummer}
          </li>
        ))}
      </ul>
    </div>
  );
}

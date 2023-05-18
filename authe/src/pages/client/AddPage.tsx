import React, { useState } from "react";

const ClientAddPage = () => {
  const [clientName, setClientName] = useState("");
  const [jwks, setJwks] = useState("");

  return (
    <div>
      <h1>Client Add Page</h1>
      <button className="btn btn-primary">Add</button>
      <div>
        <span>ClientName</span>
        <input type="text" className="input input-bordered" value={clientName} onChange={(e) => setClientName(e.target.value)} />
      </div>
      <div>
        <span>JWKS</span>
        <input type="text" className="input input-bordered" value={jwks} onChange={(e) => setJwks(e.target.value)} />
      </div>
    </div>
  );
};

export default ClientAddPage;
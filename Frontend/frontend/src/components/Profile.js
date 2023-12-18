import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const { state } = useLocation();
  useEffect(() => {
    console.log(state);
  }, [state]);
  //   const { data } = state;
  const signOut = () => {
    localStorage.removeItem("cairocodersToken");
    navigate("/");
  };
  console.log(state?.loginData?.access_token?.access_token);
  return (
    <>
      <div style={{ minHeight: 800, marginTop: 20 }}>
        <h1>Profile Page</h1>
        <p>Hi, this is your profile</p>
        <p>Welcome, keshav!</p>
        <div>
          <button
            type="button"
            className="btn btn-success btn-lg"
            onClick={signOut}
          >
            Sign Out
          </button>
        </div>
      </div>
    </>
  );
}

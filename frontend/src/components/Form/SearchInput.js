import React, { useState } from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const SearchInput = () => {
    const [values, setValues] = useSearch();
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.get(
                `/api/v1/product/search/${values.keyword}`
            );
            setValues({ ...values, results: data });
            navigate("/search");
        } catch (error) {
            console.log(error);
        }
    };

    const searchbuttonStyles = {
        fontFamily: "serif",
        fontSize: "1.2rem",
        fontWeight: 500,
        color: isHovered ? "black" : "white",
        backgroundColor: isHovered ? "#ffbf00" : "black",
        border: "none",
        padding: "10px 15px",
        borderRadius: "8px",
        margin: "0 10px",
        cursor: "pointer",
    };
    return (
        <div>
            <form
                className="d-flex search-form"
                role="search"
                onSubmit={handleSubmit}
            >
                <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={values.keyword}
                    onChange={(e) => setValues({ ...values, keyword: e.target.value })}
                />
                <button className="btn" style={searchbuttonStyles} onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)} type="submit">
                    Search
                </button>
            </form>
        </div>
    );
};

export default SearchInput;



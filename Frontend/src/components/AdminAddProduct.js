import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import "./AdminAddProduct.css"

function AdminAddProduct() {
    const [productType, setProductType] = useState("");
    const [fabricFormData, setFabricFormData] = useState({
        fabricName: "",
        fabricQuantity: "",
        fabricImage: null
    });

    const [suitFormData, setSuitFormData] = useState({
        suitStyleName: "",
        suitDesign: "",
        suitMeasurements: {
            chest: "",
            stomach: "",
            wrist: "",
            hip: "",
            shoulder: "",
            sleeveLength: "",
            length: ""
        },
        suitQuantity: "",
        suitImage: null
    });

    const [accessoryFormData, setAccessoryFormData] = useState({
        accessoryType: "",
        accessoryQuantity: "",
        accessoryImage: null
    });

    const handleProductTypeChange = (e) => {
        setProductType(e.target.value);
    };

    const handleFabricInputChange = (e) => {
        setFabricFormData({
            ...fabricFormData,
            [e.target.name]: e.target.value
        });
    };

    const handleSuitInputChange = (e) => {
        if (e.target.name === "suitMeasurements") {
            setSuitFormData({
                ...suitFormData,
                suitMeasurements: {
                    ...suitFormData.suitMeasurements,
                    [e.target.id]: e.target.value
                }
            });
        } else {
            setSuitFormData({
                ...suitFormData,
                [e.target.name]: e.target.value
            });
        }
    };

    const handleAccessoryInputChange = (e) => {
        setAccessoryFormData({
            ...accessoryFormData,
            [e.target.name]: e.target.value
        });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (productType === "fabric") {
            setFabricFormData({
                ...fabricFormData,
                fabricImage: file
            });
        } else if (productType === "suit") {
            setSuitFormData({
                ...suitFormData,
                suitImage: file
            });
        } else if (productType === "accessory") {
            setAccessoryFormData({
                ...accessoryFormData,
                accessoryImage: file
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission based on product type
        console.log("Form submitted!");
    };

    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <AdminSidebar />
                </aside>
                <section className="col-md-9 mt-2">
                    <div className="row">
                        <div className="add-product">
                            <h2>Add your Product</h2>
                            <select value={productType} onChange={handleProductTypeChange}>
                                <option value="">Select Product Type</option>
                                <option value="fabric">Fabric</option>
                                <option value="suit">Suit</option>
                                <option value="accessory">Accessory</option>
                            </select>
                            {productType === "fabric" && (
                            <form onSubmit={handleSubmit}>
                                <h3>Add Fabric</h3>
                                <input type="text" name="fabricName" placeholder="Fabric Name" value={fabricFormData.fabricName} onChange={handleFabricInputChange} />
                                <br />
                                <input type="text" name="fabricQuantity" placeholder="Fabric Quantity" value={fabricFormData.fabricQuantity} onChange={handleFabricInputChange} />
                                <br />
                                <input type="file" onChange={handleImageUpload} />
                                <br />
                                <button type="submit">Submit</button>
                            </form>
                        )}

                        {productType === "suit" && (
                            <form onSubmit={handleSubmit}>
                                <h3>Add Suit</h3>
                                <input type="text" name="suitStyleName" placeholder="Suit Style Name" value={suitFormData.suitStyleName} onChange={handleSuitInputChange} />
                                <br />
                                <input type="text" name="suitDesign" placeholder="Suit Design" value={suitFormData.suitDesign} onChange={handleSuitInputChange} />
                                <br />
                                <div className="measurements">
                                    <input type="text" id="chest" placeholder="Chest" />
                                    <input type="text" id="stomach" placeholder="Stomach"  onChange={handleSuitInputChange} />
                                    <input type="text" id="wrist" placeholder="Wrist" onChange={handleSuitInputChange} />
                                    <input type="text" id="hip" placeholder="Hip"  onChange={handleSuitInputChange} />
                                    <br />
                                    <input type="text" id="shoulder" placeholder="Shoulder" onChange={handleSuitInputChange} />
                                    <input type="text" id="sleeveLength" placeholder="Sleeve Length" onChange={handleSuitInputChange} />
                                    <input type="text" id="length" placeholder="Length" onChange={handleSuitInputChange} />
                                </div>
                                <br />
                                <input type="text" name="suitQuantity" placeholder="Suit Quantity" value={suitFormData.suitQuantity} onChange={handleSuitInputChange} />
                                <br />
                                <input type="file" onChange={handleImageUpload} />
                                <br />
                                <button type="submit">Submit</button>
                            </form>
                        )}

                        {productType === "accessory" && (
                            <form onSubmit={handleSubmit}>
                                <h3>Add Accessory</h3>
                                <select name="accessoryType" value={accessoryFormData.accessoryType} onChange={handleAccessoryInputChange}>
                                    <option value="">Select Accessory Type</option>
                                    <option value="button">Button</option>
                                    <option value="tie">Tie</option>
                                    <option value="tieClip">Tie Clip</option>
                                </select>
                                <br />
                                <input type="text" name="accessoryQuantity" placeholder="Accessory Quantity" value={accessoryFormData.accessoryQuantity} onChange={handleAccessoryInputChange} />
                                <br />
                                <input type="file" onChange={handleImageUpload} />
                                <br />
                                <button type="submit">Submit</button>
                            </form>
                        )}

                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default AdminAddProduct;

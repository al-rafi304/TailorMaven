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
                                <input type="text" name="fabricColor" placeholder="Fabric Color" onChange={handleFabricInputChange} />
                                <br />
                                <input type="text" name="fabricPrice" placeholder="Fabric Price" onChange={handleFabricInputChange} />
                                <br />
                                <input type="text" name="fabricQuantity" placeholder="Fabric Quantity" onChange={handleFabricInputChange} />
                                <br />
                                <input type="file" onChange={handleImageUpload} />
                                <br />
                                <button type="submit">Submit</button>
                            </form>
                        )}

                        {productType === "suit" && (
                            <form onSubmit={handleSubmit}>
                                <br />
                                <h3>Add Suit</h3>
                                <select name="suitType" onChange={handleAccessoryInputChange}>
                                    <option value="">Select Suit Type</option>
                                    <option value="single_breast">Single Breast</option>
                                    <option value="double_breast">Double Breast</option>
                                    <option value="tuxedo">Tuxedo</option>
                                </select>
                                <div className="measurements">
                                    <br/>
                                    <h4>Measurements</h4>
                                    <br/>
                                    <input type="text" id="length" placeholder="Length" onChange={handleSuitInputChange} />
                                    <input type="text" id="waist" placeholder="Waist" onChange={handleSuitInputChange} />
                                    <input type="text" id="chest" placeholder="Chest" />
                                    <input type="text" id="armLength" placeholder="Arm Length" onChange={handleSuitInputChange} />
                                    <input type="text" id="buttonColor" placeholder="Button Color"  onChange={handleSuitInputChange} />
                                </div>
                                <br />
                                <select name="suitFebric" onChange={handleAccessoryInputChange}>
                                    <option value="">Select Suit Fabric</option>
                                    <option value="fabric1">Cotton</option>
                                    <option value="fabric2">Silk</option>
                                    <option value="fabric3">Polyester</option>
                                </select>
                                <br />
                                <input type="text" name="suitPrice" placeholder="Suit Price" onChange={handleSuitInputChange} />
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

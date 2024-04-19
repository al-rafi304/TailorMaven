import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import "./AdminAddProduct.css"

function AdminAddProduct() {
    const [productType, setProductType] = useState("");
    const [fabricFormData, setFabricFormData] = useState(new FormData());
    const [suitFormData, setSuitFormData] = useState(new FormData());
    const [accessoryFormData, setAccessoryFormData] = useState(new FormData());

    const handleProductTypeChange = (e) => {
        setProductType(e.target.value);
    };

    const handleFabricInputChange = (e) => {
        fabricFormData.set(e.target.name, e.target.value)
        setFabricFormData(fabricFormData);
    };

    const handleSuitInputChange = (e) => {
        fabricFormData.set(e.target.name, e.target.value)
        setFabricFormData(fabricFormData);
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
            fabricFormData.set("image", file)
            setFabricFormData(fabricFormData)
        } else if (productType === "suit") {
            suitFormData.set("image", file)
            setSuitFormData(suitFormData)
        } else if (productType === "accessory") {
            setAccessoryFormData({
                ...accessoryFormData,
                accessoryImage: file
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(productType === "fabric"){
            fetch(`api/v1/fabric/`, {
                method: "POST",
                headers: {"authorization": "Bearer " + localStorage.getItem("token")},
                body: fabricFormData
            })
            window.location.reload()
        }
        else if(productType === "suit"){
            fetch(`api/v1/suit/`, {
                method: "post",
                headers: {"authorization": "Bearer " + localStorage.getItem("token")},
                body: suitFormData
            })
            window.location.reload()
        }
        // else{
        //     fetch(`api/v1/suit/`, {
        //         method: "post",
        //         headers: {"authorization": "Bearer " + localStorage.getItem("token"), "Content-Type": "application/json"},
        //         body: JSON.stringify(suitFormData)
        //     })
        //     window.location.reload()
        // }
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
                            </select>
                            {productType === "fabric" && (
                            <form onSubmit={handleSubmit}>
                                <h3>Add Fabric</h3>
                                <input type="text" name="name" placeholder="Fabric Name" onChange={handleFabricInputChange} />
                                <br />
                                <input type="text" name="color" placeholder="Fabric Color" onChange={handleFabricInputChange} />
                                <br />
                                <input type="text" name="price" placeholder="Fabric Price" onChange={handleFabricInputChange} />
                                <br />
                                <input type="text" name="stock" placeholder="Fabric Quantity" onChange={handleFabricInputChange} />
                                <br />
                                <label htmlFor="formFile" className="form-label">Fabric Image</label>
                                <input className="form-control" name="image" accept = "image/*" type="file" id="formFile" onChange={handleImageUpload}/>
                                <br />
                                <button type="submit">Submit</button>
                            </form>
                        )}

                        {productType === "suit" && (
                            <form onSubmit={handleSubmit}>
                                <br />
                                <h3>Add Suit</h3>
                                <select name="type" onChange={handleAccessoryInputChange}>
                                    <option value="">Select Suit Type</option>
                                    <option value="single_breast">Single Breast</option>
                                    <option value="double_breast">Double Breast</option>
                                    <option value="tuxedo">Tuxedo</option>
                                </select>
                                <div className="measurements">
                                    <br/>
                                    <h4>Measurements</h4>
                                    <br/>
                                    <input type="text" name="length" placeholder="Length" onChange={handleSuitInputChange} />
                                    <input type="text" name="waist" placeholder="Waist" onChange={handleSuitInputChange} />
                                    <input type="text" name="chest" placeholder="Chest" />
                                    <input type="text" arm_lenght="armLength" placeholder="Arm Length" onChange={handleSuitInputChange} />
                                    <input type="text" button="buttonColor" placeholder="Button Color"  onChange={handleSuitInputChange} />
                                </div>
                                <br />
                                <select name="fabric" onChange={handleAccessoryInputChange}>
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
                                <label htmlFor="formFile" className="form-label">Fabric Image</label>
                                <input className="form-control" name="image" accept = "image/*" type="file" id="formFile" onChange={handleImageUpload}/>
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

import React, {useEffect, useState} from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import "./Section1.css";

const Section1 = (props) => {
    useEffect(() => {
        console.log(props.match.params.pageId)
    }, [])
    return (
        <div className = "static-section1">
            <div className = "static-section1-banner">
                <img src = "/Assets/Images/section-banner.jpg"/>
            </div>
            <div className = "static-section1-header">
                <div className = "static-section1-header-img">
                    <img src = "/Assets/Images/section-brand.jpeg" />
                </div>
                <div className = "static-section1-header-title">
                    <h1>Hello Everyone</h1>
                </div>
            </div>
            <div className = "static-section1-desc">
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p>
            </div>
        </div>
    )
}

export default (withRouter(Section1))
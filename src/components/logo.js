import React from "react";
import styled from "styled-components";
import logo from "../assets/EggChange.svg";
import word1 from "../assets/Word1.png";
import word2 from "../assets/Word2.png";

const LogoContainer = styled.div`
width: ${p => p.size}px;
height: ${p => p.size}px;
max-width: ${p => p.size}px;
max-height: ${p => p.size}px;
min-width: ${p => p.size}px;
min-height: ${p => p.size}px;
border-radius: 50%;
background: ${p => p.color};
display: flex;
justify-content: center;
align-items: center;

img {
    width: 80%;
}
`;

export const Logo = ({ size = 250, ...props }) => (
    <img
        {...props}
        src={logo}
        alt="logo"
        style={{
            'height': size
        }}
    />
)
export const LogoCircle = ({ size = 250, color = "#FFD95899", ...props }) => (
    <LogoContainer
        {...props}
        size={size}
        color={color}
    >
        <img src={logo} alt="logo" />
    </LogoContainer>
)

const LogoWordContainer = styled.div`
display: flex;
img {
    width: auto;
    height: ${p => p.size}px;
    &:first-child {
        margin-right: ${p => p.size*0.1}px;
    }
}
div.word {
    display: flex;
    flex-direction: column;
    img[alt=word1] {
        /* Real width ${p => (2858.44 / 1900) * p.size}px; */
        /* EggChange: 2509 × 658 */
        /* A Knowledge Hub: 1702 × 214 */
        width: ${p => (2509/658) * 658 / (658 + 214) * p.size}px;
        height: ${p => 658 / (658 + 214) * p.size}px;
    }
    img[alt=word2] {
        width: ${p => (1702/214) * 214 / (658 + 214) * p.size}px;
        height: ${p => 214 / (658 + 214) * p.size}px;
    }
}
div.word-full {
    display: flex;
    flex-direction: column;
    img[alt=word1] {
        width: auto;
        height: ${p => p.size}px;
    }
}
&.vertical {
    flex-direction: column;
    img:first-child {
        margin-right: 0;
        margin-bottom: ${p => p.size*0.05}px;
    }
    div.word {
        align-items: center;
        img[alt=word1] {
            /* Real width ${p => (2858.44 / 1900) * p.size}px; */
            /* EggChange: 2509 × 658 */
            /* A Knowledge Hub: 1702 × 214 */
            width: ${p => (0.7) * (2509 / 658) * 658 / (658 + 214) * p.size}px;
            height: ${p => (0.7) * 658 / (658 + 214) * p.size}px;
            margin-bottom: 0px;
        }
        img[alt=word2] {
            width: ${p => (0.7) * (1702 / 214) * 214 / (658 + 214) * p.size}px;
            height: ${p => (0.7) * 214 / (658 + 214) * p.size}px;
        }
    }
    div.word-full {
        display: flex;
        flex-direction: column;
        img[alt=word1] {
            width: auto;
            height: ${p => 0.7 * p.size}px;
            margin-bottom: 0px;
        }
    }
}
`;

export const LogoWithWord = ({ size = 100, isVertical = false, ...props }) => (
    <LogoWordContainer
        {...props}
        size={size}
        className={isVertical ? "vertical" : ""}
    >
        <img src={logo} alt="logo" />
        <div className="word">
            <img src={word1} alt="word1" />
            <img src={word2} alt="word2" />
        </div>
    </LogoWordContainer>
)

export const LogoWithName = ({ size = 100, isVertical = false, ...props }) => (
    <LogoWordContainer
        {...props}
        size={size}
        className={isVertical ? "vertical" : ""}
    >
        <img src={logo} alt="logo" />
        <div className="word-full">
            <img src={word1} alt="word1" />
        </div>
    </LogoWordContainer>
)
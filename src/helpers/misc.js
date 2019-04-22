export function staticSize(height, width) {
    return `height: ${height};
    min-height: ${height};
    max-heright: ${height};
    width: ${width};
    max-width: ${width};
    min-width: ${width};`;
}

export function hoverEffect() {
    return `&:hover {
        filter: brightness(1.05);
    }
    &:active {
        filter: brightness(0.9);
    }`;
}

export function shadowHoverEffect() {
    return `box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
    &:hover {
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        filter: brightness(1.05);
    }
    &:active {
        box-shadow: none;
        filter: brightness(0.9);
    }`;
}

/* random integer (min, max] */
export function randint(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

export function randomHash(length) {
    const char = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*-+";
    return (Array.from(new Array(length).keys()).map(() => char[randint(0, char.length)]).join(""));
}

export function convertToDay(num) {
    let tmp = num;
    let weekDays = [0, 0, 0, 0, 0, 0, 0];
    const labelDays = ["จันทร์", "อังคาร", "พุธ", "พฤหัส", "ศุกร์", "เสาร์", "อาทิตย์"]
    let oneCount = 0;
    for(let i = 0; i < 7; i++) {
        weekDays[i] = tmp%2;
        oneCount += tmp%2;
        tmp = Math.floor(tmp/2);
    }

    let outString = '';
    if(oneCount === 7 || (oneCount < 4 && oneCount > 0)) {
        outString = 'เปิดบริการทุกวัน';
        if (oneCount < 4) {
            outString += " ";
            outString += weekDays.map((it, idx) => it === 1 ? labelDays[idx] : false).filter(Boolean).join(" ");
        }
    }
    else if(oneCount >= 4 || oneCount === 0) {
        // ปิดทำการทุก
        outString += "ปิดบริการทุกวัน";
        if (oneCount >= 4) {
            outString += " ";
            outString += weekDays.map((it, idx) => it === 0 ? labelDays[idx] : false).filter(Boolean).join(" ");
        }
    }
    return outString;
}

export const capitalizedWords = (str) => {
    return str.split(" ").filter((it) => typeof(it) === "string" && it.length > 0).map((st) => `${st[0].toUpperCase()}${st.slice(1, st.length)}`).join(" ");
}
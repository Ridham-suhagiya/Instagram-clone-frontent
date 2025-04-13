const InfoIcon = ({ fill, height, width }: any) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width || "24px"}
            height={height || "24px"}
            viewBox="0 0 24 24"
            fill={fill || "none"}
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
    );
};

export default InfoIcon;

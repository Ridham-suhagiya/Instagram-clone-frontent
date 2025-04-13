const ShareIcon = ({ fill, height, width }: any) => {
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
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </svg>
    );
};

export default ShareIcon;

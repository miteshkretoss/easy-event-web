import React, { useEffect, useRef, useState } from 'react';

function VideoElement({ base64Video, videoclass, getBackURL }) {
    const [videoObjectURL, setVideoObjectURL] = useState(null);
    const [played, setPlayed] = useState(false);
    const videoRef = useRef(null);

    useEffect(() => {
        // Function to convert Base64 to video object URL
        const convertBase64ToVideoObjectURL = () => {
            const blob = b64toBlob(base64Video, 'video/mp4');
            const url = URL.createObjectURL(blob);
            setVideoObjectURL(url);
            getBackURL && getBackURL(url)
        };

        convertBase64ToVideoObjectURL();
    }, [base64Video]);

    const handlePlay = () => {
        if (videoRef.current && !played) {
            videoRef.current.play().then(() => {
                setPlayed(true);
            });
        }
    };

    function b64toBlob(base64, contentType) {
        contentType = contentType || '';
        const sliceSize = 1024;
        const byteCharacters = atob(base64);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);

            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }

        return new Blob(byteArrays, { type: contentType });
    }

    const attemptPlay = () => {
        videoRef &&
            videoRef.current &&
            videoRef.current.play().catch(error => {
                console.error("Error attempting to play", error);
            });
    };

    useEffect(() => {
        videoObjectURL && attemptPlay();
    }, [videoObjectURL]);

    return (
        <div>
            {videoObjectURL && (
                <>
                    <video ref={videoRef}
                        playsInline
                        loop
                        muted
                        className={videoclass}>
                        <source src={videoObjectURL} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </>
            )
            }
        </div >
    );
}


export default VideoElement;

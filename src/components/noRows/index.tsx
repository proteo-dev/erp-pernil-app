import Box from "@mui/material/Box";

function CustomNoRowsOverlay() {
    return (
        <Box
            sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            No hay información para mostrar
        </Box>
    );
}

export default CustomNoRowsOverlay
import { Card, CardContent, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function InfoCard({ card }) {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => {
        if (!card.disabled) navigate("/user/Dashboard");
      }}
      sx={{
        borderRadius: "16px",
        p: 3,
        minHeight: "180px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        cursor: card.disabled ? "not-allowed" : "pointer",
        opacity: card.disabled ? 0.6 : 1,
        pointerEvents: card.disabled ? "none" : "auto",
        transition: "all 0.3s ease",
        border: "1px solid #e0e0e0",
        boxShadow: "0px 8px 16px rgba(0,0,0,0.03)",
        "&:hover": {
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.06)",
        },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {/* Icon Container */}
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: 2,
            bgcolor: "linear-gradient(135deg, #4f46e5, #8b5cf6)", // You can use theme colors here
            background: "linear-gradient(135deg, #4f46e5, #8b5cf6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            mr: 2,
          }}
        >
          {card.icon}
        </Box>

        {/* Text Block */}
        <Box>
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            color="text.primary"
            gutterBottom
          >
            {card.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.6 }}
          >
            {card.subTitle}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
}

import { Box } from "@mui/material"
import Image from "next/image"
import Link from "next/link"
import SimpleTypography from "@/components/typography"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function TopCategories({ item }: any) {
    return (
        <Link href={`${item.link}`}>
            <a style={{ textDecoration: "none" }}>
                <Box
                    className="topCategories__card"
                    sx={{
                        width: "100%",
                        background: "#fff",
                        padding: "20px",
                        border: "1px solid transparent",
                        borderRadius: "4px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: 'space-between',
                        boxShadow: " 0px 2px 8px rgba(0, 0, 0, 0.05)"
                    }}
                >
                    <Box
                        className="topCategories__icon"
                        sx={{
                            background: "#F3E5FF",
                            width: "60px",
                            height: "60px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "8px",
                            marginRight: "20px"
                        }}
                    >
                        {item.icon}
                    </Box>
                    <Box>
                        <SimpleTypography text={item.title} className="topCategories__name" variant="h2" />
                        <SimpleTypography text={item.desc} className="topCategories__desc" />
                    </Box>

                </Box>
            </a>
        </Link>

    )
}

export default TopCategories
import SimpleTypography from "@/components/typography";
import { interiorRequirements } from "@/data/samples/interior_requirements";
import { styled } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";

const ListItem = styled('li')(
    () => `
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        color: #303030;
        &:not(:last-child) {
            margin-bottom: 10px;
        }
    `
)

export function AddInteriorRequirements() {

    const [requirements, setRequirements] = useState<any[]>(interiorRequirements)

    // useEffect(() => {
    //     instance.get('/requirements/interiorupload')
    //         .then(res => {
    //             setRequirements(res.data.data)
    //         })
    //     console.log(requirements);
    // })

    return (
        <Box
            sx={{
                width: '100%',
                backgroundColor: '#fff',
                border: '1px solid #E0E0E0',
                padding: '28px'
            }}
        >
            <Box sx={{ width: '100%', marginBottom: '18px' }}>
                <SimpleTypography
                    text="Требования"
                    sx={{
                        fontWeight: 500,
                        fontSize: '22px',
                        lineHeight: '26px',
                        letterSpacing: '-0.02em',
                        textAlign: 'left',
                    }}
                />
            </Box>

            <Box sx={{ width: '100%', paddingLeft: '25px' }}>
                <ul
                    style={{
                        margin: 0,
                        padding: 0
                    }}
                >
                    {
                        requirements.map((r, i) => (
                            <ListItem key={i}>
                                {r.description}
                            </ListItem>
                        ))
                    }
                </ul>
            </Box>
        </Box>
    )
}
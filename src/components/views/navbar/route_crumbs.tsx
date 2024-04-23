"use clien"

import { Box } from "@mui/material";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation"
import SimpleTypography from "../../typography";
import { RouteCrumb } from "../../../types/interfaces";
import { useSelector } from "react-redux";
import { selectRouteCrubms } from "../../../data/route_crumbs";
import Image from "next/image";
import { useMemo, useState } from "react";

interface Props {
  crumbs?: RouteCrumb[]
}

export default function RouteCrumbs({ ...props }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const crumbs = useSelector(selectRouteCrubms)
  // const [crumbs, setCrumbs] = useState<RouteCrumb[]>(crumbsData)

  // useMemo(() => {
  //   setCrumbs(crumbsData)
  // }, [crumbsData])

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start'
      }}
    >
      {
        crumbs.map((crumb, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start'
            }}
            onClick={() => crumb?.onClick ? crumb?.onClick() : null}
          >
            <Link
              href={crumb?.route}
            >
              <SimpleTypography
                sx={{
                  color: index == crumbs.length - 1 ? '#111111' : '#646464',
                  fontWeight: 500,
                  fontSize: '20px',
                  lineHeight: '24px',
                  letterSpacing: '-0.02em',
                }}
                text={crumb?.title}
              />
            </Link>
            {
              index != crumbs.length - 1 &&
              <Box
                sx={{
                  m: '0 12px',
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'center'
                }}
              >
                <Image
                  style={{ marginBottom: '2px' }}
                  src="/icons/breadcrumb-arrow.svg"
                  alt="arrow"
                  width={12}
                  height={18}
                />
              </Box>
            }
          </Box>
        ))
      }
    </Box>
  )
}
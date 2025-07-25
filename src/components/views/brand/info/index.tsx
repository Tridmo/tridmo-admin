import { Box, Grid } from "@mui/material";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import SimpleTypography from "../../../typography";

import { Instagram, Public } from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { selectOneBrand } from "../../../../data/get_one_brand";
import { IMAGES_BASE_URL } from "../../../../utils/image_src";
import Buttons from "../../../buttons";

export default function BrandInfo() {
  const router = useRouter();
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const brandBox = {
    padding: "20px",
    background: "#fff",
    borderRadius: "4px",
    border: "1px solid #B3B3B3",
    marginBottom: "28px",
    display: "flex",
  };

  const dispatch = useDispatch<any>();
  const brand = useSelector(selectOneBrand);

  function getSocialLink(
    urls: string[],
    target: string,
    connector: string = "/"
  ) {
    const has = urls.find((url) => target.startsWith(url));
    return target
      ? !!has
        ? target
        : `${urls[0]}${connector}${target}`
      : urls[0];
  }

  function getSocialLinkUsername(urls: string[], target: string) {
    const has = urls.find((url) => target.startsWith(url));
    return target ? (!!has ? target.split(has)[1] : target) : "";
  }

  function getUrlDomen(url: string) {
    let domen = url.replace("http://", "").replace("https://", "");
    return domen;
  }

  return (
    <Grid
      className="products__grid"
      container
      spacing={2}
      sx={{ width: "100%", marginBottom: "32px" }}
    >
      <Grid
        className="products__info"
        item
        xs={12}
        md={4}
        sx={{ marginTop: "20px" }}
      >
        <Image
          width={400}
          height={400}
          alt="Brand image"
          style={{ objectFit: "cover" }}
          src={`${IMAGES_BASE_URL}/${brand?.image_src}`}
        />
      </Grid>

      <Grid
        className="products__info"
        item
        xs={12}
        md={8}
        sx={{ marginTop: "20px", paddingLeft: "50px !important" }}
      >
        <Grid
          container
          justifyContent={"space-between"}
          sx={{ marginBottom: "40px" }}
        >
          <Grid item>
            <SimpleTypography className="brand__name" text="Название бренда" />
            <SimpleTypography
              text={brand?.name}
              className="brand_page__info--title"
              variant="h1"
            />
          </Grid>
          <Grid item>
            <Link href={`/brands/edit/${brand?.slug}`}>
              <Buttons
                name="Редактировать"
                className="login__btn"
                childrenFirst={true}
                sx={{ p: "10px 18px !important" }}
              >
                <Image
                  alt="icon"
                  width={20}
                  height={20}
                  src="/icons/pen-white.svg"
                />
              </Buttons>
            </Link>
          </Grid>
        </Grid>

        <SimpleTypography className="brand__name" text="Описание" />
        <SimpleTypography
          text={brand?.description}
          className="brand_page__info--desc"
          sx={{ marginBottom: "40px" }}
        />

        <Grid
          container
          spacing={1}
          sx={{
            display: "flex",
          }}
        >
          <Grid item>
            <Link
              target="_blank"
              href={`http://maps.google.com/?q=${brand?.country}`}
              rel="noopener noreferrer"
            >
              <Buttons className="brand__box" name="">
                <Public
                  sx={{
                    width: "23px",
                    height: "23px",
                    color: "#424242",
                  }}
                />
                <Box sx={{ marginLeft: "11px" }}>
                  <SimpleTypography className="brand__name" text="Страна" />
                  <SimpleTypography
                    className="brand__box--text"
                    text={brand?.country}
                  />
                </Box>
              </Buttons>
            </Link>
          </Grid>
          <Grid item>
            <Link
              target="_blank"
              href={`http://maps.google.com/?q=${brand?.address}`}
              rel="noopener noreferrer"
            >
              <Buttons className="brand__box" name="">
                <Image
                  width={19}
                  height={23}
                  alt="Location"
                  src={"/icons/location.svg"}
                />
                <Box sx={{ marginLeft: "11px" }}>
                  <SimpleTypography className="brand__name" text="Локация" />
                  <SimpleTypography
                    className="brand__box--text"
                    text={brand?.address}
                  />
                </Box>
              </Buttons>
            </Link>
          </Grid>
          <Grid item>
            <Link href={`tel:${brand?.phone}`}>
              <Buttons className="brand__box" name="">
                <Image
                  width={19}
                  height={23}
                  alt="Phone number"
                  src={"/icons/phone.svg"}
                />
                <Box sx={{ marginLeft: "11px" }}>
                  <SimpleTypography
                    className="brand__name"
                    text="Номер телефона"
                  />
                  <SimpleTypography
                    className="brand__box--text"
                    text={`${brand?.phone}`}
                  />
                </Box>
              </Buttons>
            </Link>
          </Grid>
          {/* <Grid item>
            <Link href={`mailto:${brand?.email}`}>
              <Buttons className='brand__box' name="">
                <Image
                  width={19}
                  height={23}
                  alt="Email"
                  src={"/icons/mail.svg"}
                />
                <Box sx={{ marginLeft: "11px" }}>
                  <SimpleTypography className='brand__name' text="Электрон Почта" />
                  <SimpleTypography className='brand__box--text' text={`${brand?.email}`} />
                </Box>
              </Buttons>
            </Link>
          </Grid> */}
          <Grid item>
            <a target="_blank" href={brand?.site_link}>
              <Buttons className="brand__box" name="">
                <Image
                  width={19}
                  height={23}
                  alt="web"
                  src={"/icons/web.svg"}
                />
                <Box sx={{ marginLeft: "11px" }}>
                  <SimpleTypography className="brand__name" text="Веб-сайт" />
                  <SimpleTypography
                    className="brand__box--text"
                    text={getUrlDomen(brand?.site_link || "")}
                  />
                </Box>
              </Buttons>
            </a>
          </Grid>
          <Grid item>
            <a
              target="_blank"
              href={getSocialLink(
                ["https://instagram.com/", "https://www.instagram.com/"],
                brand?.instagram
              )}
            >
              <Buttons className="brand__box" name="">
                <Instagram
                  sx={{
                    width: "23px",
                    height: "23px",
                    color: "#424242",
                  }}
                />
                <Box sx={{ marginLeft: "11px" }}>
                  <SimpleTypography className="brand__name" text="Инстаграм" />
                  <SimpleTypography
                    className="brand__box--text"
                    text={getSocialLinkUsername(
                      ["https://instagram.com/", "https://www.instagram.com/"],
                      brand?.instagram
                    )}
                  />
                </Box>
              </Buttons>
            </a>
          </Grid>
          {brand?.styles ? (
            brand?.styles[0] ? (
              <Grid item>
                <Box>
                  <Buttons className="brand__box" name="">
                    <Image
                      width={19}
                      height={23}
                      alt="web"
                      src={"/icons/cube.svg"}
                    />
                    <Box sx={{ marginLeft: "11px" }}>
                      <SimpleTypography className="brand__name" text="Стиль" />
                      <SimpleTypography
                        className="brand__box--text"
                        text={`${brand?.styles[0]?.name}`}
                      />
                    </Box>
                  </Buttons>
                </Box>
              </Grid>
            ) : null
          ) : null}
        </Grid>
      </Grid>
    </Grid>
  );
}

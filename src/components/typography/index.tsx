"use client"

import { ThemeProps } from '@/types/theme';
import { SxProps, Typography, styled } from '@mui/material';
import React from 'react'

type TypographyProps = {
  text: string,
  sx?: SxProps,
  variant?: any,
  className?: string,
  children?: any,
  paragraph?: any,
};

const TypographyWrapper = styled(Typography)(
  // text-transform: capitalize;
  ({ theme }: ThemeProps) => `
      color:  ${theme.colors.gray[600]};
      font-weight: 500;
      font-size: 16px;
      line-height: 140%;
      transition: all 0.4s ease;

      &.MuiTypography-modal__title {
        font-size: 25px;
        fontWeight: 500;
        margin-bottom:12px;
      }

      &.MuiTypography-card__title {
        width:60%;
        overflow: hidden;
        white-space: nowrap;
        font-weight: 400;
        text-overflow: ellipsis;
        text-align: start;
        font-size: 14px;
        line-height: 18px;
        display: flex;
        align-items: center;
        color: ${theme.colors.gray[700]};
        background-image: linear-gradient(90deg,#000000 0%,rgba(0,0,0,0));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        position:relative;
      }

      &.MuiTypography-modal__sub-title {
        font-weight: 400;
        font-size: 16px;
        line-height: 22px;
        color: ${theme.colors.gray[700]};
      }

      &.MuiTypography-card__title-brand {
        min-width: 74px;
        padding: 4px;
        background-color: #FAFAFA;
        border: 1px solid #B3B3B3;
        border-radius: 4px;
        font-weight: 400;
        font-size: 12px;
        line-height: 14px;
        letter-spacing: -0.02em;
        text-align: start;
        color: #141414;
      }

      &.MuiTypography-footer__desc{
        margin:14px 0 8px 0;
        font-weight: 400;
        font-size: 13px;
        color: ${theme.colors.gray[600]};
      }

      &.MuiTypography-footer__link{
        padding:9px;

        &:hover{
          background:  ${theme.colors.gray[50]};
          color: #141414;
        }
      }

      &.MuiTypography-footer__title{
        text-align:start;
        font-weight: 600;
        font-size: 18px;
        line-height: 120%;
        margin-bottom:18px;
        color: ${theme.colors.gray[700]};
      }

      &.MuiTypography-section__title{
        
        font-weight: 500;
        font-size: 22px;
        line-height: 120%;
        letter-spacing: -0.02em;
        color: #000;
        margin-bottom:12px;
      }

      &.MuiTypography-pagenation__desc{
        font-weight: 400;
        font-size: 14px;
        line-height: 140%;
        color: ${theme.colors.gray[600]};
      }

      &.MuiTypography-pagenation__desc--bold{
        font-weight: 600;
        margin-left: 5px;
      }

      &.MuiTypography-user__name{      
        color: ${theme.colors.gray[700]};
      }

      &.MuiTypography-card__sale{
        position:absolute;
        top: 5px;
        right: 5px;
        font-size: 12px;
        font-weight: 500;
        line-height: 14px;
        letter-spacing: -0.01em;
        color:#fff;
        background: #7210be;
        border: 1.5px solid #fff;
        border-radius: 3px;
        padding: 3px 6px;
        z-index: 10;
        text-transform: uppercase;
      }
      
      &.MuiTypography-category__title{
        font-size: 18px;
        line-height: 22px;
        padding-top: 16px;
        padding-bottom: 16px;
      }

      &.MuiTypography-category__text{
        font-size: 14px;
        line-height: 17px;
        color: #303030;
      }

      &.MuiTypography-category__arrow-title{
        font-weight:400;
        font-size: 18px;
        line-height: 22px;
        padding-top: 16px;
        padding-bottom: 16px;
        margin-left:15px;
        cursor:pointer
      }
      &.MuiTypography-category__link{
        color: #1D5BF9;
        text-decoration: none;
        border-bottom: 2px solid #B7CBFD;
        &:hover{
          color: #5584FA;
        }
      }
      &.MuiTypography-category__name{
        font-weight: 500;
        font-size: 18px;
        line-height: 22px;
        padding 20px 0 16px 0;
      }

      &.MuiTypography-product__info--title{
        font-weight: 500;
        font-size: 30px;
        line-height: 36px;
        letter-spacing: -0.02em;
        color: #141414;
        margin-bottom: 6px;
      }

      &.MuiTypography-product__info--desc{
        max-width:507px;
        font-weight: 400;
        font-size: 16px;
        line-height: 22px;
        margin-bottom: 28px;
        color: #424242;
      }

      &.MuiTypography-brand__info--title{
        font-weight: 500;
        font-size: 30px;
        line-height: 36px;
        letter-spacing: -0.02em;
        color: #141414;
      }

      &.MuiTypography-brand__info--desc{
        max-width:760px;
        font-weight: 400;
        font-size: 16px;
        line-height: 22px;
        color: #424242;
      }

      &.MuiTypography-brand_page__info--title{
        font-weight: 500;
        font-size: 34px;
        line-height: 41px;
        letter-spacing: -0.02em;
        color: #141414;
      }

      &.MuiTypography-brand_page__info--desc{
        max-width:760px;
        font-weight: 400;
        font-size: 20px;
        line-height: 30px;
        letter-spacing: -0.02em;
        color: #424242;
      }

      &.MuiTypography-table__text{
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        text-align: start;
        color: #303030;
      }

      &.MuiTypography-table__text_info{
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        text-align: start;
        color: #141414;
      }

      &.MuiTypography-table__link{
        color: #1D5BF9;
        text-decoration: none;
        text-align: start;
        border-bottom: 2px solid #B7CBFD;
        width: fit-content;

        &:hover{
          color: #5584FA;
        }
      }

      &.MuiTypography-material__title{
        color: #424242;
        margin-right:3px;
        margin-bottom: 6px;
      }

      &.MuiTypography-material__text{
        color: #000
      }

      &.MuiTypography-download__button--text{
        font-weight: 400;
        font-size: 14px;
        display: block;
        padding-right: 8px;
        color: #141414;
      }

      &.MuiTypography-download__button--mb{
        font-weight: 400;
        font-size: 13px;
        color: #424242;
        text-align:start;
      }


      &.MuiTypography-account__title{
        font-size: 30px;
        line-height: 120%;
        letter-spacing: -0.02em;
        color: #000;
        margin-bottom: 16px;
      }

      &.MuiTypography-user__name{
        font-size: 20px;
        line-height: 120%;
        letter-spacing: -0.02em;
        color: #303030;
        margin-top: 8px;
        margin-bottom:6px;
      }

      &.MuiTypography-user__email{
        font-weight: 400;
        font-size: 16px;
        line-height: 22px;
        color: #424242;
      }

      &.MuiTypography-billing__info--text{
        font-size: 14px;
        line-height: 120%;
        color: #141414;
      }

      &.MuiTypography-table__material--text{
        font-weight: 400;
        font-size: 16px;
        line-height: 140%;
        color: #141414;
        margin-right:3px
      }

      &.MuiTypography-not-found__title{
        font-size: 42px;
        line-height: 120%;
        letter-spacing: -0.02em;
        color: #303030;
        margin-bottom:16px;
      }

      &.MuiTypography-not-found__text{
        font-weight: 400;
        font-size: 16px;
        color: #686868;
        max-width:338px;
        margin-bottom:24px;
      }

      &.MuiTypography-modal__title{
        font-weight: 500;
        font-size: 30px;
        line-height: 36px;
        letter-spacing: -0.02em;
        color: #141414;
      }

      &.MuiTypography-buy__dollar{
        font-weight: bold;
        font-size: 17px;
        line-height: 140%;
        color: #fff;
        margin-left:3px;
      }

      &.MuiTypography-drow-down__text{
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        color: #303030;
        margin-left:8px;
      }

      &.MuiTypography-filters__title{
        font-weight: 400;
        font-size: 16px;
        line-height: 22px;
        color: #686868;
        margin-right: 12px;
      }

      &.MuiTypography-filters__item--text{
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        margin-right: 2px;
        color: #303030;
      }

      &.MuiTypography-filters__clear--text{
        font-size: 12px;
        line-height: 14px;
        letter-spacing: 0.02em;
        color: #1D5BF9;
        margin-left:4px
      }

      &.MuiTypography-edit__account--text{
        font-size: 16px;
        line-height: 22px;
        color: #1D5BF9;
        border-bottom: 1.5px solid #B7CBFD;
      }
      
      &.MuiTypography-brand__name{
        text-align: start;
        font-weight: 400;
        font-size: 13px;
        line-height: 18px;
        color: #A6A6A6;
      }

      &.MuiTypography-brand__title{
        font-size: 18px;
        line-height: 22px;
        letter-spacing: -0.01em;
        color: #7210BE;
        border-bottom: 1.5px solid #b7cbfd;
        width: fit-content;

        &:hover{
          opacity:0.7
        }
      }

      &.MuiTypography-brand__box--text{
        text-align:start;
        font-size: 14px;
        line-height: 17px;
        color: #424242;
      }

      &.MuiTypography-back__text{
        font-size: 14px;
        line-height: 17px;
        color: #0646E6;
        border-bottom: 1.2px solid #B7CBFD;
        margin-left:8px;
        margin-right:10px;
        position:relative;

        &::before{
          content:"";
          position:absolute;
          right:-10px;
          width: 1px;
          height: 16px;
          background: #E0E0E0;
        }
      }

      &.MuiTypography-breadcumb__text{
        font-weight: 500;
        font-size: 14px;
        line-height: 17px;
        margin-right:9px;
        color: #686868;
      }

      &.MuiTypography-header__bag--count{
        width:20px;
        height:18px;
        padding: 3px 6px 2px;
        position: absolute; 
        right: -8px;
        top: -8px;
        font-size: 12px;
        line-height: 14px;
        display: flex;
        letter-spacing: 0.02em;
        color: #fff;
        z-index: 2;
        background: #141414;
        border: 1px solid #fff;
        border-radius: 10px;
        align-items: end;
        justify-content: center;
      }

      &.MuiTypography-singIn__text{
        font-size: 12px;
        line-height: 14px;
        letter-spacing: 0.02em;
        color: #424242;
      }

      &.MuiTypography-brand__name--text{
        font-weight: 400;
        font-size: 18px;
        line-height: 22px;
        letter-spacing: -0.01em;
        color: #A6A6A6;
      }

      &.MuiTypography-brand__name--title{
        font-weight: 600;
        font-size: 34px;
        line-height: 41px;
        letter-spacing: -0.02em;
        color: #141414;
        margin-bottom:32px
      }

      &.MuiTypography-brand__desc{
        font-weight: 400;
        font-size: 20px;
        line-height: 30px;  
        letter-spacing: -0.02em;
        color: #303030;
        margin:6px 0 40px 0;
      }

      &.MuiTypography-brands__title{
        font-size: 30px;
        line-height: 36px;
        letter-spacing: -0.02em;
        color: #141414;
        margin-bottom:16px
      }

      &.MuiTypography-download__warning{
        font-size: 14px;
        line-height: 36px;
        letter-spacing: -0.02em;
        color: #eb5454;
        margin-top:5px
      }

      &.MuiTypography-interiors__title{
        font-weight: 600;
        font-size: 34px;
        line-height: 41px;
        letter-spacing: -0.02em;
        color: #141414;
        margin-bottom:8px;
      }

      &.MuiTypography-interiors__desc{
        max-width:800px;
        font-weight: 400;
        font-size: 18px;
        line-height: 24px;
        letter-spacing: -0.01em;
        color: #424242;
        margin-bottom:24px;
      }

      &.MuiTypography-total__price--text{
        font-weight: 400;
        font-size: 18px;
        line-height: 24px;
        letter-spacing: -0.01em;
        color: #424242;
      }

      &.MuiTypography-total__price{
        font-weight: 500;
        font-size: 20px;
        line-height: 24px;
        letter-spacing: -0.02em;
        color: #141414;
      }

      &.MuiTypography-badge__title{
        font-weight: 400;
        font-size: 16px;
        line-height: 22px;
        color: #141414;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      &.MuiTypography-purchesed__models--title{
        font-weight: 400;
        font-size: 14px;
        line-height: 18px;
        color: #141414;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        max-width:150px;
      }
      &.MuiTypography-purchesed__models--desc{
        font-weight: 400;
        font-size: 12px;
        line-height: 14px;
        letter-spacing: 0.02em;
        color: #686868;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        max-width:150px;
      }

      &.MuiTypography-purchesed__models--date{
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        color: #141414;
      }

      &.MuiTypography-purchesed__models--order{
        font-weight: 500;
        font-size: 14px;
        line-height: 17px;
        color: #1d5bf9;
        border-bottom: 1.2px solid #b7cbfd;
        width: fit-content;
      }

      &.MuiTypography-purchesed__models--price{
        font-weight: 500;
        font-size: 16px;
        line-height: 22px;
        color: #141414;
      }

      &.MuiTypography-table__payment--status {
        padding: 4px;
        color: #4FB46A;
      }

      &.MuiTypography-modal__id{
        font-weight: 400;
        font-size: 22px;
        line-height: 26px;
        letter-spacing: -0.02em;
        color: #848484;
        margin-left:12px
      }

      &.MuiTypography-topCategories__name{
        font-weight: 500;
        font-size: 18px;
        line-height: 22px;
        letter-spacing: -0.01em;
        color: #303030;
        width: 86px;
        margin-bottom:4px;
        display: inline;
      }

      &.MuiTypography-topCategories__desc{
        max-width:250px;
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        color: #848484;
      }

      &.MuiTypography-verification__back{
        font-weight: 500;
        font-size: 14px;
        line-height: 17px;
        color: #1D5BF9;
        border-bottom: 1.2px solid #B7CBFD;
        padding-bottom:1px;
        text-transform: initial;
      }

      &.MuiTypography-table__no--brand{
        font-size: 16px;
        line-height: 140%;
        text-align: start;
        font-weight: 400;
      }

      &.MuiTypography-card__title-free{
        background: #E8F3EB;
        border: 1px solid #B0D9BA;
        border-radius: 3px;
        font-weight: 500;
        font-size: 13px;
        line-height: 18px;
        text-transform: uppercase;
        color: #3C9154;
        padding: 2px 4px;
      }

      &.MuiTypography-footer__gmail{
        font-weight: 500;
        font-size: 16px;
        line-height: 22px;
        color: #686868;
        text-align:start;
        margin-left:5px
      }

      &.MuiTypography-about__title{
        font-weight: 600;
        font-size: 34px;
        line-height: 41px;
        letter-spacing: -0.02em;
        color: #000000;
        margin-bottom:32px;
      }

      &.MuiTypography-about__desc{
        font-weight: 400;
        font-size: 20px;
        line-height: 30px;
        letter-spacing: -0.02em;
        color: #141414;
      }


      &.MuiTypography-models-page__btn--text{
        font-weight: 500;
        font-size: 14px;
        line-height: 17px;
        color: #FFFFFF;
        margin-left:6px;
      }

      &.MuiTypography-models-page__close{
        font-weight: 500;
        font-size: 30px;
        line-height: 36px;
        letter-spacing: -0.02em;
        color: #000000;
      }


      &.MuiTypography-yamo_id{
        font-weight: 400;
        font-size: 12px;
        line-height: 14px;  
        letter-spacing: 0.02em;
        color: #A6A6A6;
      }

      &.MuiTypography-why-us__title{
        font-weight: 500;
        font-size: 20px;
        line-height: 24px;
        letter-spacing: -0.02em;
        color: #303030;
        margin-bottom:8px;
      }

      &.MuiTypography-why-us__desc{
        font-weight: 400;
        font-size: 18px;
        line-height: 24px;
        letter-spacing: -0.01em;
        color: #686868;
      }

      &.MuiTypography-collection__models--title{
        font-weight: 500;
        font-size: 20px;
        line-height: 24px;
        letter-spacing: -0.02em;
        color: #141414;
      }

      &.MuiTypography-collection__models--name{
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        color: #141414;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 210px;
      }
      &.MuiTypography-collection__models--desc{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 210px;N
        font-weight: 400;
        font-size: 13px;
        line-height: 18px;
        color: #686868;
        display:block;
        margin-bottom:0;
      }

      &.MuiTypography-collection__models--sale{
        font-weight: 400;
        font-size: 16px;
        line-height: 22px;
        color: #7210BE;
      }

      &.MuiTypography-collection__models--total{
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        color: #686868;
      }

      &.MuiTypography-collection__models--discount{
        background: #7210BE;
        border-radius: 3px;
        font-weight: 500;
        font-size: 12px;
        line-height: 14px;
        text-align: right;
        letter-spacing: 0.02em;
        color: #FFFFFF;
        padding:2px 4px;
        margin-left:6px
      }

      &.MuiTypography-landing_section_name{
        color: #303030;
        font-weight: 500;
        font-size: 20px;
        line-height: 24px;
        text-align: start;
        letter-spacing: -0.02em;
      }

      &.MuiTypography-landing_section_desc{
        color: #848484;
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        text-align: start;
      }

      &.MuiTypography-generalQuestions__desc{
        font-weight: 400;
        font-size: 16px;
        line-height: 22px;
        color: #686868;
      }

      &.MuiTypography-generalQuestions__title{
        font-weight: 500;
        font-size: 14px;
        line-height: 17px;
        color: #141414;
      }
      &.MuiTypography-generalQuestions__accardion--desc{
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        color: #424242;
        padding: 0px 18px;
        margin-bottom:12px;
      }

      &.MuiTypography-hero__title{
        font-weight: 600;
        font-size: 38px;
        line-height: 46px;
        text-align: flex-start;
        letter-spacing: -0.04em;
        color: #141414;
        max-width:684px;
        margin:0 auto 16px auto;
      }

      &.MuiTypography-nav__item--text{
        font-weight: 500;
        font-size: 16px;
        line-height: 22px;
        color: #686868;

        &:hover{
          opacity:0.7
        }
      }

      &.MuiTypography-hero__desc{
        max-width:500px;
        font-weight: 400;
        font-size: 20px;
        line-height: 30px;
        text-align: flex-start;
        letter-spacing: -0.02em;
        color: #424242;
        margin-bottom: 28px;
      }

      &.MuiTypography-popular__categories--title{
        font-weight: 500;
        font-size: 22px;
        line-height: 26px;
        letter-spacing: -0.02em;
        color: #141414;
        margin-bottom:12px
      }

      &.MuiTypography-popular__categories--name{
        max-width:108px;
        font-weight: 500;
        font-size: 16px;
        line-height: 22px;
        color: #303030;
      }

      &.MuiTypography-products__result--text{
        font-weight: 400;
        font-size: 16px;
        line-height: 22px;
        color: #686868;
        margin-bottom:20px
      }

    
      &.MuiTypography-prodcts__result--title{
        font-size: 22px;
        font-weight: 500;
        line-height: 26px;
        letter-spacing: -0.02em;
        color: #141414;
        margin-bottom: 4px
      }

      &.MuiTypography-check__text{
        max-width: 90%;
        font-weight: 400;
        font-size: 13px;
        line-height: 18px;
        color: #424242;
        display:flex;
        align-items:center;

        &::before{
          content:"";
          width:18px;
          height:13px;
          background-image:url("/icons/check.svg");
          background-size:13px 13px;
          margin-right:9px;
          background-repeat: no-repeat;
        }
      }
`
);

const SimpleTypography = (props: TypographyProps) => {
  return (
    // <Button className={`${classes.styles} MuiButton-text-${props.color} MuiButton-bg-${props.color}`}>{props?.name}</Button>
    <TypographyWrapper
      sx={{ whiteSpace: 'pre-line', ...props?.sx }}
      className={`MuiTypography-${props?.className}`}
      variant={props?.variant}
      paragraph={props?.paragraph}
    >
      {props?.text}
      {props?.children}
    </TypographyWrapper>
  )
}

export default SimpleTypography
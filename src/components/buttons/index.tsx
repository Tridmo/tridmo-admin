import React from 'react';
import {
  Button,
  CircularProgress,
  SxProps,
  styled,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import '@/styles/buttons.module.scss'
// import styled from '@emotion/styled';
import { ThemeProps } from '@/types/theme';
import CustomCircularProgress from '../circular_progress';


const ButtonWrapper = styled(Button)(
  ({ theme }: ThemeProps) => `
      text-transform: inherit;
      width:auto;
      height:43px;
      font-weight: 500;
      font-size: 16px;
      color: #646464;
      line-height: 140%;
      color:  ${theme.colors.primary[100]};
      transition: all 0.4s ease;
      cursor: pointer;
      border-radius: 4px;

      .MuiButton-startIcon {
        margin-left: 0 !important;
        min-width: 20px !important;
        min-height: 20px !important;
        display: flex;
        align-items: center;
        justify-content: center;

        span {
          width: 100%;
          height: 100%;
        }
      }
      
      &.MuiButton-bordered__btn {
        width:100px;
        height:40px;
        color:${theme.colors.gray[700]};
        background-color: white;
        padding:0 20px ;
        position:relative;
        border: 1.7px solid transparent;

        &::before{
          content:"";
          position:absolute;
          right:0;
          top:0;
          width:100%;
          height:105%;
          border: 1.7px solid ${theme.colors.gray[300]};
          border-radius: ${theme.shape.button.borderRadius}px !important;
        }
        
        &:hover::before{
          border: 2.5px solid ${theme.colors.gray[300]};  
        } 
      }

      &.MuiButton-bordered__btn--explore{
        color: #303030;
        background-color: #fff;
        padding:9px 16px;
        position:relative;
        border: 1.7px solid #B3B3B3;
        border-radius: 4px;

        &:hover{
          border-color: #686868;
        } 
      }

      &.MuiButton-bordered__btn--signup{
        color: #303030;
        background-color: #fff;
        padding:9px 16px;
        position:relative;
        border: 1.7px solid #B3B3B3;
        border-radius: 4px;

        &:hover{
          border-color: #686868;
        } 
      }

      &.MuiButton-search__btn{
        color:#FFFFFF;
        background-color: #7210BE;
        padding:23px 16px;
        position: absolute;
        top: -1%;
        right: -1%;
        border: 1.7px solid #7210BE;
        border-radius: 4px;

        &:hover{
          background: #9E35EE;
          border-color: #9E35EE;
        } 
      }

      &.MuiButton-upload__btn{
        color:#FFFFFF;
        background-color: #7210BE;
        padding:11px 16px;
        border-radius: 4px;

        img {
          margin-right: 8px;
        }

        &:hover{
          background: #9E35EE;
        } 
      }

      &.MuiButton-cancel__btn{
        color:#292929;
        background-color: #f5f5f5;
        padding:10px 24px;
        border-radius: 4px;

        &:hover{
          background: #f2f2f2;
        } 
      }
      &.MuiButton-confirm__btn{
        color:#fff;
        background-color: #DA1515;
        padding:10px 24px;
        border-radius: 4px;

        .MuiButton-startIcon {
          margin-right: 0;
          margin-left: 0;
        }

        &:hover{
          background: #ea2e2e;
        } 
      }

      &.MuiButton-login__btn {
        height:40px;
        border: 1.7px solid ${theme.colors.gray[900]};
        color:white;
        background-color: ${theme.colors.gray[900]};
        padding:0 20px ;
        border-radius:4px;
        
        &:hover{
          background-color:${theme.colors.gray[700]};
          border-color: ${theme.colors.gray[700]};
          
        }   

        &--disabled {
          height:40px;
          border: 1.7px solid ${theme.colors.gray[500]};
          color:white;
          background-color: ${theme.colors.gray[500]};
          padding:0 20px ;
          border-radius:4px;
        }
      } 

      &.MuiButton-borderless__btn {
        height :40px;
        color: #686868;
        padding: 0 20px ;
        border-radius: 4px;
        
        &:hover{
          background-color: #F5F5F5;
        }
      } 

      &.MuiButton-underlined__btn {
        min-width:30px;
        padding:0;
        font-size: 13px;
        line-height: 22px;
        height:auto;
        color: #1D5BF9;
        border-bottom: 1.5px solid #B7CBFD;
        background:transparent;
        border-radius:0;
        &:hover{
          background-color:white;
          border-color: ${theme.colors.gray[700]};
        }  
      }

      &.MuiButton-signIn__btn{
        width:100%;
        background: #7210BE;
        color:#fff;
        margin-top: 24px;
        margin-bottom: 10px;
        border-radius:4px;

        &:hover{
          background: #9E35EE;  
        }

        &:disabled{
          background: #E0E0E0;
          color: #686868; 
        }
      }

      &.MuiButton-download__zip--file{
        width:100%;
        padding: 9px 12px;
        border: 1px solid #e0e0e0;
        border-radius: 4px;
        margin-bottom: 10px;
        justify-content: start;
        gap: 10px;
        text-align: start;
        height:auto;
        cursor:text;
        flex-direction:column;
        align-items: start;
        background:transparent !important;
      }


      &.MuiButton-download-small__zip--file{
        width:100%;
        padding: 2px 8px;
        border: 1px solid #e0e0e0;
        border-radius: 4px;
        justify-content: start;
        gap: 10px;
        text-align: start;
        height:auto;
        cursor:text;
        flex-direction:column;
        align-items: start;
        margin-bottom: 10px;
      }

      &.MuiButton-download__model{
        width: 100%;
        background: #7210BE;
        border-radius: 4px;
        font-size: 16px;
        line-height: 22px;
        text-align: center;
        color: #fff;
        &--model {
          width: 100%;
          background: #7210BE;
          border-radius: 4px;
          color: #fff;
        }
        &:hover{
          background: #9E35EE;
        }
        &--disabled{
          pointer-events: none;
          width: 258px;
          background: #7210BE;
          border-radius: 4px;
          font-size: 16px;
          line-height: 22px;
          text-align: center;
          color: #fff;
          }
      }

      &.MuiButton-slider__right--arrow{
        position: absolute;
        z-index: 10;
        top:50%;
        right:0;
        transform: translateY(-50%);
        min-width: 44px;  
        height:44px;
        padding:0;
        background: rgba(250, 250, 250, 0.6);
        border-radius: 4px;
      }
      
      &.MuiButton-slider__left--arrow{
        position: absolute;
        z-index: 10;
        top:50%;
        left:0;
        transform: translateY(-50%);
        min-width: 44px;
        height:44px;
        padding:0;
        border-radius: 4px;
        background: rgba(250, 250, 250, 0.6);
      }
      &.MuiButton-explore__btn{
        border: 1.7px solid #B3B3B3;
        border-radius: 4px;
        padding: 9px 16px;
        color: #303030;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 12px;
      }

      &.MuiButton-colors__btn{
        width: 26px;
        height: 26px;
        border-radius:50%;
        min-width: 26px;
        margin-bottom:9px;
        position: relative;

        .btn__check{
          opacity:0
        }

        &:not(:last-child){
          margin-right:13px
        }

        &:hover::before {
          opacity:1;
        }

        &::before{
          content:"";
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 32px;
          height: 32px;
          border: 2px solid #cd96f6;
          border-radius:50%;
          opacity:0;
          transition: all 0.4s ease;
        }
      }

      &.colors__active--btn::before{
        opacity:1
      }

      &.colors__active--btn .btn__check{
        opacity: 1  
      }

      &.MuiButton-not-found__btn{
        padding:9px 20px;
        border-radius: 4px;
        background: #141414;
        font-weight: 500;
        font-size: 16px;
        line-height: 140%;
        color: #fff;
        display:flex;
        align-items: center;
        cursor:pointer;

        span{
          margin-right:10px !important;
        }
        
      }

      &.MuiButton-purple_outlined__btn{
        padding: 8px 18px;
        color: #7210BE;
        background-color: #fff;
        border: 2px solid #7210BE;
        border-radius: 4px;
        &:hover{
          border-color: #5F0D9E;
        } 
        img{
          margin-right: 8px;
        }
      }

      &.MuiButton-bookmar__btn{
        padding:9px 12px;
        color: #303030;
        background-color: #fff;
        position:relative;
        border: 1.7px solid #B3B3B3;
        border-radius: 4px;

        &:hover{
          border-color: #686868;
        } 

        img{
          margin-right: 8px;
        }
      }

      &.MuiButton-bookmark__btn--disabled{
        padding:9px 12px;
        background-color: #F5F5F5;
        color: #848484;
        cursor: not-allowed;
        pointer-events: none;
        position:relative;
        border: 1.7px solid #E0E0E0;
        border-radius: 4px;

        img{
          margin-right: 8px;
        }
      }

      &.MuiButton-upload__img--btn{
        border: 1.7px solid #b3b3b3;
        padding:9px 20px;
        font-weight: bold;
        font-size: 16px;
        line-height: 140%;
        color: #303030;
        display:flex;
        flex-direction: row-reverse;
        border-radius: 4px;

        img{
          margin-right:6px !important
        }

      }

      &.MuiButton-filters__item--close{
        min-width: 28px;
        width: 28px;
        height: 28px;
        padding:0;
        border-radius:50%;
        background: transparent;
        display: flex;
        align-items: center;
        justify-content: center;

        svg{
          color:#686868;
          transition: all 0.4s ease;
          font-size:15px;
        }

      }
      

      &.MuiButton-filters__clear--btn{
        padding:0;
        height:16px;
        margin-left:22px;
      }

      &.MuiButton-profile__done--btn{
        width:100%;
        background: #7210BE;
        border-radius: 4px;
        font-size: 16px;
        line-height: 22px;
        color: #FFFFFF;
      }

      &.MuiButton-profile__change--btn{
        background: #F5F5F5;
        border: 1.7px solid #E0E0E0;
        border-radius: 4px;
        width:100%;
        font-weight: 500;
        font-size: 16px;
        line-height: 22px;
        margin-bottom:16px;
        color: #848484;
      }

      &.MuiButton-edit__account--btn{
        padding:0;
        min-width:auto;
        height:auto
      }

      &.MuiButton-product__btn{
        border: 1px solid #E0E0E0;
        border-radius: 4px;
        padding:5px 20px;
        height:auto
      }

      &.MuiButton-brand__box{
        background: #fff;
        border: 1px solid #E0E0E0;
        border-radius: 4px;
        padding:8px 15px;
        width:240px;
        height:auto;
        display: flex;
        align-items: center;
        justify-content: start;

        &:hover{
          box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
          background: #FAFAFA;
        }
      }

      &.MuiButton-download__model--disabled{
        width: 100%;
        background: #e0e0e0;
        color: #686868;
      }

      &.MuiButton-slider__btn{
        min-width: 36px;
        height: 36px;
        border: 1.7px solid #b3b3b3;
        border-radius: 4px;
        padding:0;
        display: flex;
        align-items: center;
        justify-content: center;
        color:#303030;

        span{
          margin:0 !important
        }

        &:hover{
          opacity:0.7
        }
      }

      &.slider__disabled{
        pointer-events: none;
        opacity:0.5 !important;
      }

      &.MuiButton-buy__model--disabled{
        width:100%;
        background: #E0E0E0;
        border-radius: 4px;
        padding:13px 0;
        font-weight: 500;
        font-size: 16px;
        line-height: 22px;
        color: #686868;
        pointer-events:none
      }
      &.MuiButton-buy__model{
        width:100%;
        background: #7210BE;
        border-radius: 4px;
        padding:13px 0;
        font-weight: 500;
        font-size: 16px;
        line-height: 22px;
        color: #fff;
        transition: all 0.4s ease;

        &:hover{
          background: #9E35EE;
        }
      }

      &.MuiButton-purchesed__models--btn{
        border: 1.7px solid #B3B3B3;
        border-radius: 4px;
        padding:9.5px 16px;
        font-weight: 500;
        font-size: 14px;
        line-height: 17px;
        color: #303030;
        display:flex;
        align-items: center;
      }


      &.MuiButton-bordered__btn--explore-responsive{
        width: 100%;
        font-weight: 500;
        font-size: 14px;
        line-height: 17px;
        color: #303030;
        padding:9.5px 0;
        color:#FFFFFF;
        background-color: #141414;
        position:relative;
        border: 1.7px solid #141414;
        border-radius: 4px;

        &:hover{
          background:#303030
        }
      }

      &.MuiButton-models-page__btn{
        background: #141414;
        border-radius: 4px;
        padding:13px 18px;
      }

      &.MuiButton-options_menu__btn{
        background: transparent;
        border-radius: 50%;
        width: 20px;
        height: 20px;
      }

      &.MuiButton-apply__filter{
        background: #7210BE;
        border-radius: 4px;
        font-weight: 500;
        font-size: 16px;
        line-height: 22px;
        color: #FFFFFF;
        width:100%;
      }

      &.MuiButton-delete__tag{
        background: #fafafa;
        min-width: 36px;
        width: 36px;
        height: 36px;
        border-radius: 0px !important;
        padding: 8px;
        display: flex;
        align-items: center;
        justify-content: center;

        svg path {
          transition: all 0.2s ease;  
        }

        &:hover {
          background-color: #FAE1E1;
        }

        &:hover svg path {
          fill: #DB2E2E;
        }
      }

`
)

type ButtonsProps = {
  id?: string,
  name?: string,
  sx?: SxProps,
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"] | "button",
  className?: string,
  children?: any,
  disabled?: boolean,
  startIcon?: boolean,
  onClick?: React.ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
  endIcon?: string,
  bgColor?: string,
  childrenFirst?: boolean,
  loadingColor?: string,
};

export default function Buttons({ childrenFirst, ...props }: ButtonsProps) {

  return (
    <ButtonWrapper
      id={props?.id}
      className={`MuiButton-${props?.className}`}
      sx={{
        ...props?.sx,
        background: props?.bgColor,
        ":hover": { background: props?.bgColor },
      }}
      onClick={props?.onClick}
      startIcon={props?.startIcon ? <CustomCircularProgress size="1rem" color={props?.loadingColor} /> : null}
      endIcon={
        props?.endIcon === "right" ? <ArrowForwardIcon /> :
          props?.endIcon === "left" ? <ArrowBackIcon /> :
            props?.endIcon === "cart" ? <ShoppingCartCheckoutIcon /> :
              props?.endIcon === "checkout" ? <OpenInNewIcon /> : null
      }
      disabled={props?.disabled}
      type={props?.type}
    >
      {childrenFirst && !props?.startIcon ? props?.children : null}
      {
        props?.startIcon &&
          props?.className == 'confirm__btn'
          ? props?.startIcon
          : props?.name
      }
      {!childrenFirst && !props?.startIcon ? props?.children : null}
    </ButtonWrapper >
  );
};

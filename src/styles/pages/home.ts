import { styled } from "..";

export const HomeContainer = styled('main', {
    position: 'relative',

})

export const DivIcon = styled('button', {
    borderRadius: "10px",
    background: "$green500",
    width: "56px",
    height: "56px",
    display: "flex",
    alignItems: 'center',
    justifyContent: "center",
    cursor: 'pointer',
    border: "none",
    span: {
        width: "40px",
        height: "40px",
        background: "black",
        borderRadius: "50%",
        position: "absolute",
        right: "75px",
        top: "33px",
        alignItems: "center",
        justifyContent: "center",
        fontSize: '1.3rem'
    }

})
export const Header = styled('header', {
    margin: "3rem 0 6rem 0",
    display: "flex"
})

export const Product = styled('div', {
    height: "600px",
    '&.active': {
        footer: {
            transform: 'translateY(0%)',
            opacity: 1,
        },
    },

    background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
    borderRadius: 8,
    padding: '0.25rem',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    img: {
        objectFit: 'cover',
    },

    footer: {
        position: 'absolute',
        bottom: '0.25rem',
        left: '0.25rem',
        right: '0.25rem',
        padding: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '.5rem',

        borderRadius: 6,
        background: 'rgba(0, 0, 0, 0.6)',

        transform: 'translateY(110%)',
        opacity: 0,
        transition: 'all 0.2s ease-in-out',

        '.title': {
            display: 'flex',
            gap: '.5rem',
            flexDirection: 'column',
            flex: 1,

            strong: {
                fontSize: '$lg',
                color: '$gray100',
            },

            span: {
                fontSize: '$xl',
                fontWeight: 'bold',
                color: '$green300',
            },
        },

        '.icon': {
            width: '3.5rem',
            height: '3.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',

            borderRadius: 6,
            background: '$green500',
            color: '$white',
        },
    },
})

export const ArrowLeft = styled('button', {
    cursor: 'pointer',
    paddingLeft: '1rem',
    paddingRight: '4.5rem',

    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    zIndex: 10,

    border: 0,
    color: '$gray300',
    background: 'linear-gradient(-90deg, rgba(18, 18, 20, 0) 0%, rgba(18, 18, 20, 0.75) 100%)',
    '&:hover': {
        color: '$white',
    },

    '@media(max-width: 500px)': {
        paddingRight: 0,
    },
})

export const ArrowRight = styled('button', {
    cursor: 'pointer',
    paddingRight: '1rem',
    paddingLeft: '4.5rem',

    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,

    border: 0,
    color: '$gray300',
    background: 'linear-gradient(90deg, rgba(18, 18, 20, 0) 0%, rgba(18, 18, 20, 0.75) 100%)',

    '&:hover': {
        color: '$white',
    },

    '@media(max-width: 500px)': {
        paddingLeft: 0,
    },
})
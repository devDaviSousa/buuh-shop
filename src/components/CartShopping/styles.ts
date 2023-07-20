import { keyframes, styled } from "@/styles";


const rotate = keyframes({
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
});

export const CartShoppingContainer = styled('div', {
    height: '100vh',
    maxWidth: 'auto',
    position: 'fixed',
    top: 0,
    right: 0,
    zIndex: 50,
    display: 'flex',
    flexDirection: 'column',
    padding: '3rem',

    background: '$gray800',
    boxShadow: '-10px 0 30px rgba(0, 0, 0, 0.8)',

    h2: {
        marginTop: '1rem',
        fontSize: '$lg',
    },

    '@media(max-width: 500px)': {
        width: '100%',
    },
})

export const CloseButton = styled('button', {
    position: 'absolute',
    right: '1.5rem',
    top: '1.5rem',
    cursor: 'pointer',
    border: 'none',
    background: 'none',
    color: '$gray300',

    '&:hover': {
        color: '$white',
    },
})

export const Items = styled('div', {
    overflowY: 'auto',
    marginBlock: '2rem',
    paddingRight: '1rem',

    '&::-webkit-scrollbar': {
        background: '$gray900',
        width: 6,
    },

    '&::-webkit-scrollbar-thumb': {
        background: '$gray300',
        width: 6,
    },
})

export const Item = styled('div', {
    marginBottom: '1.5rem',
    gridTemplateColumns: '100px 1fr',
    display: 'grid',
    gap: '1rem',
    gridTemplateAreas: `
    "image info"
    "image actions"
  `,

    '@media(max-width: 500px)': {
        gridTemplateAreas: `
    "image info"
    "actions actions"
  `,
    },
})

export const ImageContainer = styled('div', {
    gridArea: 'image',
    width: 100,
    height: 100,
    borderRadius: 8,
    background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
})

export const Info = styled('div', {
    gridArea: 'info',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',

    'span': {
        display: 'block',
        fontSize: '$md',
    },

    'strong': {
        marginTop: '.5rem',
        display: 'block',
        fontSize: '$md',
    },
})

export const Actions = styled('div', {
    gridArea: 'actions',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '1rem',
    width: '100%',

    button: {
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '.5rem',
        padding: '.5rem',

        border: 'none',
        color: '$white',
        background: '$green500',
        fontWeight: 'bold',
        borderRadius: 6,

        '&:hover': {
            background: '$green300',
        },
    },

    '.quantity': {
        display: 'flex',
        gap: '.75rem',

        span: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',

            fontSize: '$lg',

            fontWeight: 'bold',
            verticalAlign: 'bottom',
        },
    },
})

export const PurchaseDetails = styled('div', {
    marginTop: 'auto',

    div: {
        display: 'flex',
        justifyContent: 'space-between',
    },

    'div:nth-child(2)': {
        marginTop: '.5rem',
        color: '$gray100',
        fontWeight: 'bold',

        p: {
            fontSize: '$md'
        },

        span: {
            fontSize: '$xl',
        },
    },

    button: {
        width: '100%',
        marginTop: '2rem',
        backgroundColor: '$green500',
        border: 0,
        color: '$white',
        borderRadius: 8,
        padding: '1.25rem',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '$md',

        '.loading': {
            animation: `${rotate} 1000ms infinite linear`,
        },

        '&:disabled': {
            opacity: 0.6,
            cursor: 'not-allowed',
        },

        '&:not(:disabled):hover': {
            background: '$green300',
        }
    },
})

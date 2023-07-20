import { styled } from "@/styles"


export const HeaderContainer = styled('header', {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingInline: '10vh',

    '@media(max-width: 500px)': {
        paddingInline: '1rem',
        marginBlock: '1rem 2rem',
    },
})

export const ShoppingCartButton = styled('button', {
    position: 'relative',
    width: '3rem',
    height: '3rem',
    border: 0,
    borderRadius: 6,
    padding: '.75rem',

    cursor: 'pointer',
    background: '$gray800',
    color: '$gray300',

    span: {
        position: 'absolute',
        boxSizing: 'content-box',
        top: '-20%',
        right: '-20%',

        width: '1.5rem',
        height: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        color: '$white',
        fontWeight: 'bold',
        fontSize: '.875rem',
        borderRadius: '50%',
        border: '3px solid $gray900',
        background: '$green500',
    },

    '&:hover': {
        color: '$white',
    },
})

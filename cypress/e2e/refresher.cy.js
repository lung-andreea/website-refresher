const NUMBER_OF_SECONDS = 1.5

const ocrApiKey = 'K89747904988957'

describe('template spec', () => {
    let codeWithO = ''

    beforeEach(()=>{
        cy.session('login-session',()=>{
            cy.visit("https://electriccastle.com/login")

            cy.get('[ng-hide="hac.isLoggedIn()"] > [ui-sref="ElectricCastlePublic.Login"]').click({force: true})

            cy.get('.col-lg-6 > .login-form > .form-group__email > #user-email').type('lung.andreea.cristina@gmail.com')
            cy.get('.col-lg-6 > .login-form > .form-group__password > #user-password').type('rKPhMhtL')

            cy.get('.col-lg-6 > .login-form > .form-group__actions > :nth-child(1) > .flex > .std-button').click()
        })
        cy.setCookie('AUTH_TOKEN', 'nGBJLY0fFePFGA%3D%3D')
    })

    it('reloadPage', () => {
        cy.reloadUntilFound({
            url: 'https://electriccastle.com/bontidafever',
            selector: 'img[alt="EC free pass"]',
            onSuccess: async (foundElem) => {
                console.log('FOUND THE IMAGE CODE!!!', foundElem.src)
                const imageUrl = 'https://api2.electriccastle.ro/media/wysiwyg/ga_talks.jpg'
                await fetch(`https://api.ocr.space/parse/imageurl?apikey=${ocrApiKey}&url=${imageUrl}`).then(res => res.json()).then(data=>{
                    const parsedText = data?.ParsedResults?.[0]?.ParsedText || ''
                    const code = parsedText.split('\r\n')?.[1]
                    codeWithO = 'O'+code.substring(1)
                    console.log('processing time',data?.ProcessingTimeInMilliseconds, codeWithO)
                })
            },
            onError: () => {
                console.log('No code yet. Reloading...')
                cy.wait(NUMBER_OF_SECONDS * 1000)
            }
        })
        cy.then(()=>{
            cy.redeemAccess(codeWithO)
        })
    })
})
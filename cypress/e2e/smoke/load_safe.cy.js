import 'cypress-file-upload'
import * as constants from '../../support/constants'
import * as main from '../pages/main.page'
import * as safe from '../pages/load_safe.pages'
import * as createwallet from '../pages/create_wallet.pages'

const testSafeName = 'Test safe name'
const testOwnerName = 'Test Owner Name'

describe('[SMOKE] Load Safe tests', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
    cy.visit(constants.loadNewSafeSepoliaUrl)
    main.acceptCookies()
    cy.wait(2000)
  })

  it('[SMOKE] Verify a network can be selected in the Safe', () => {
    safe.clickNetworkSelector(constants.networks.sepolia)
    safe.selectPolygon()
    cy.wait(2000)
    safe.clickNetworkSelector(constants.networks.polygon)
    safe.selectSepolia()
  })

  it('[SMOKE] Verify only valid Safe name can be accepted', () => {
    // alias the address input label
    cy.get('input[name="address"]').parent().prev('label').as('addressLabel')

    createwallet.verifyDefaultWalletName(createwallet.defaltSepoliaPlaceholder)
    safe.verifyIncorrectAddressErrorMessage()
    safe.inputNameAndAddress(testSafeName, constants.SEPOLIA_TEST_SAFE_1)

    safe.verifyAddressInputValue(constants.SEPOLIA_TEST_SAFE_1)
    safe.verifyNextButtonStatus('be.enabled')
    safe.clickOnNextBtn()
  })

  it('[SMOKE] Verify names cannot have more than 50 characters', () => {
    safe.inputName(main.generateRandomString(51))
    safe.verifyNameLengthErrorMessage()
  })

  it('[SMOKE] Verify ENS name is translated to a valid address', () => {
    // cy.visit(constants.loadNewSafeEthUrl)
    safe.inputAddress(constants.ENS_TEST_SEPOLIA)
    safe.verifyAddressInputValue(constants.SEPOLIA_TEST_SAFE_7)
    safe.verifyNextButtonStatus('be.enabled')
    safe.clickOnNextBtn()
  })

  it('[SMOKE] Verify the custom Safe name is successfully loaded', () => {
    safe.inputNameAndAddress(testSafeName, constants.SEPOLIA_TEST_SAFE_2)
    safe.clickOnNextBtn()
    createwallet.typeOwnerName(testOwnerName, 0)
    safe.clickOnNextBtn()
    safe.verifyDataInReviewSection(testSafeName, testOwnerName)
    safe.clickOnAddBtn()
    main.verifyHomeSafeUrl(constants.SEPOLIA_TEST_SAFE_2)
    safe.veriySidebarSafeNameIsVisible(testSafeName)
    safe.verifyOwnerNamePresentInSettings(testOwnerName)
  })
})

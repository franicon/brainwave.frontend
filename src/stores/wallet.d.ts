import { type Stripe } from '@stripe/stripe-js';
export interface Transaction {
    id: number;
    user_id: number;
    type: 'top-up' | 'deduct';
    amount: number;
    description?: string;
    created_at: string;
    balance_after: number;
}
export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}
export declare const useWalletStore: import("pinia").StoreDefinition<"wallet", {
    transactions: Transaction[];
    stripe: Stripe | null;
    publishableKey: string;
}, {}, {
    initStripe(): Promise<{
        elements: {
            (options?: import("@stripe/stripe-js").StripeElementsOptionsClientSecret): import("@stripe/stripe-js").StripeElements;
            (options?: import("@stripe/stripe-js").StripeElementsOptionsMode): import("@stripe/stripe-js").StripeElements;
        };
        confirmPayment: {
            (options: {
                elements: import("@stripe/stripe-js").StripeElements;
                confirmParams?: Partial<import("@stripe/stripe-js").ConfirmPaymentData>;
                redirect: "if_required";
            }): Promise<import("@stripe/stripe-js").PaymentIntentResult>;
            (options: {
                elements?: import("@stripe/stripe-js").StripeElements;
                clientSecret: string;
                confirmParams?: Partial<import("@stripe/stripe-js").ConfirmPaymentData>;
                redirect: "if_required";
            }): Promise<import("@stripe/stripe-js").PaymentIntentResult>;
            (options: {
                elements: import("@stripe/stripe-js").StripeElements;
                confirmParams: import("@stripe/stripe-js").ConfirmPaymentData;
                redirect?: "always";
            }): Promise<never | {
                error: import("@stripe/stripe-js").StripeError;
            }>;
            (options: {
                elements?: import("@stripe/stripe-js").StripeElements;
                clientSecret: string;
                confirmParams: import("@stripe/stripe-js").ConfirmPaymentData;
                redirect?: "always";
            }): Promise<never | {
                error: import("@stripe/stripe-js").StripeError;
            }>;
        };
        confirmAcssDebitPayment: (clientSecret: string, data?: import("@stripe/stripe-js").ConfirmAcssDebitPaymentData, options?: import("@stripe/stripe-js").ConfirmAcssDebitPaymentOptions) => Promise<import("@stripe/stripe-js").PaymentIntentResult>;
        confirmUsBankAccountPayment: (clientSecret: string, data?: import("@stripe/stripe-js").ConfirmUsBankAccountPaymentData) => Promise<import("@stripe/stripe-js").PaymentIntentResult>;
        confirmAlipayPayment: (clientSecret: string, data?: import("@stripe/stripe-js").ConfirmAlipayPaymentData, options?: import("@stripe/stripe-js").ConfirmAlipayPaymentOptions) => Promise<import("@stripe/stripe-js").PaymentIntentResult>;
        confirmAuBecsDebitPayment: (clientSecret: string, data?: import("@stripe/stripe-js").ConfirmAuBecsDebitPaymentData) => Promise<import("@stripe/stripe-js").PaymentIntentResult>;
        confirmBancontactPayment: (clientSecret: string, data?: import("@stripe/stripe-js").ConfirmBancontactPaymentData, options?: import("@stripe/stripe-js").ConfirmBancontactPaymentOptions) => Promise<import("@stripe/stripe-js").PaymentIntentResult>;
        confirmBilliePayment: (clientSecret: string, data?: import("@stripe/stripe-js").ConfirmBilliePaymentData, options?: import("@stripe/stripe-js").ConfirmBilliePaymentOptions) => Promise<import("@stripe/stripe-js").PaymentIntentResult>;
        confirmBlikPayment: (clientSecret: string, data: import("@stripe/stripe-js").ConfirmBlikPaymentData, options?: import("@stripe/stripe-js").ConfirmBlikPaymentOptions) => Promise<import("@stripe/stripe-js").PaymentIntentResult>;
        confirmBoletoPayment: (clientSecret: string, data?: import("@stripe/stripe-js").ConfirmBoletoPaymentData, options?: import("@stripe/stripe-js").ConfirmBoletoPaymentOptions) => Promise<import("@stripe/stripe-js").PaymentIntentResult>;
        confirmCardPayment: (clientSecret: string, data?: import("@stripe/stripe-js").ConfirmCardPaymentData, options?: import("@stripe/stripe-js").ConfirmCardPaymentOptions) => Promise<import("@stripe/stripe-js").PaymentIntentResult>;
        confirmCashappPayment: (clientSecret: string, data?: import("@stripe/stripe-js").ConfirmCashappPaymentData, options?: import("@stripe/stripe-js").ConfirmCashappPaymentOptions) => Promise<import("@stripe/stripe-js").PaymentIntentResult>;
        confirmCustomerBalancePayment: (clientSecret: string, data: import("@stripe/stripe-js").ConfirmCustomerBalancePaymentData, options: import("@stripe/stripe-js").ConfirmCustomerBalancePaymentOptions) => Promise<import("@stripe/stripe-js").PaymentIntentResult>;
        confirmEpsPayment: (clientSecret: string, data?: import("@stripe/stripe-js").ConfirmEpsPaymentData, options?: import("@stripe/stripe-js").ConfirmEpsPaymentOptions) => Promise<import("@stripe/stripe-js").PaymentIntentResult>;
        confirmFpxPayment: (clientSecret: string, data?: import("@stripe/stripe-js").ConfirmFpxPaymentData, options?: import("@stripe/stripe-js").ConfirmFpxPaymentOptions) => Promise<import("@stripe/stripe-js").PaymentIntentResult>;
        confirmGiropayPayment: (clientSecret: string, data?: import("@stripe/stripe-js").ConfirmGiropayPaymentData, options?: import("@stripe/stripe-js").ConfirmGiropayPaymentOptions) => Promise<import("@stripe/stripe-js").PaymentIntentResult>;
        confirmGrabPayPayment: (clientSecret: string, data?: import("@stripe/stripe-js").ConfirmGrabPayPaymentData, options?: import("@stripe/stripe-js").ConfirmGrabPayPaymentOptions) => Promise<import("@stripe/stripe-js").PaymentIntentResult>;
        confirmIdealPayment: (clientSecret: string, data?: import("@stripe/stripe-js").ConfirmIdealPaymentData, options?: import("@stripe/stripe-js").ConfirmIdealPaymentOptions) => Promise<import("@stripe/stripe-js").PaymentIntentResult>;
        confirmKlarnaPayment: (clientSecret: string, data?: import("@stripe/stripe-js").ConfirmKlarnaPaymentData, options?: import("@stripe/stripe-js").ConfirmKlarnaPaymentOptions) => Promise<import("@stripe/stripe-js").PaymentIntentResult>;
        confirmKonbiniPayment: (clientSecret: string, data?: import("@stripe/stripe-js").ConfirmKonbiniPaymentData, options?: import("@stripe/stripe-js").ConfirmKonbiniPaymentOptions) => Promise<import("@stripe/stripe-js").PaymentIntentResult>;
        confirmMobilepayPayment: (clientSecret: string, data?: import("@stripe/stripe-js").ConfirmMobilepayPaymentData, options?: import("@stripe/stripe-js").ConfirmMobilepayPaymentOptions) => Promise<import("@stripe/stripe-js").PaymentIntentResult>;
        confirmMultibancoPayment: (clientSecret: string, data?: import("@stripe/stripe-js").ConfirmMultibancoPaymentData, options?: import("@stripe/stripe-js").ConfirmMultibancoPaymentOptions) => Promise<import("@stripe/stripe-js").PaymentIntentResult>;
        confirmOxxoPayment: (clientSecret: string, data?: import("@stripe/stripe-js").ConfirmOxxoPaymentData, options?: import("@stripe/stripe-js").ConfirmOxxoPaymentOptions) => Promise<import("@stripe/stripe-js").PaymentIntentResult>;
        confirmP24Payment: (clientSecret: string, data?: import("@stripe/stripe-js").ConfirmP24PaymentData, options?: import("@stripe/stripe-js").ConfirmP24PaymentOptions) => Promise<import("@stripe/stripe-js").PaymentIntentResult>;
        confirmPayNowPayment: (clientSecret: string, data?: import("@stripe/stripe-js").ConfirmPayNowPaymentData, options?: import("@stripe/stripe-js").ConfirmPayNowPaymentOptions) => Promise<import("@stripe/stripe-js").PaymentIntentResult>;
        confirmPayPalPayment: (clientSecret: string, data?: import("@stripe/stripe-js").ConfirmPayPalPaymentData) => Promise<import("@stripe/stripe-js").PaymentIntentResult>;
        confirmPixPayment: (clientSecret: string, data?: import("@stripe/stripe-js").ConfirmPixPaymentData, options?: import("@stripe/stripe-js").ConfirmPixPaymentOptions) => Promise<import("@stripe/stripe-js").PaymentIntentResult>;
        confirmPromptPayPayment: (clientSecret: string, data?: import("@stripe/stripe-js").ConfirmPromptPayPaymentData, options?: import("@stripe/stripe-js").ConfirmPromptPayPaymentOptions) => Promise<import("@stripe/stripe-js").PaymentIntentResult>;
        confirmSepaDebitPayment: (clientSecret: string, data?: import("@stripe/stripe-js").ConfirmSepaDebitPaymentData) => Promise<import("@stripe/stripe-js").PaymentIntentResult>;
        confirmSofortPayment: (clientSecret: string, data?: import("@stripe/stripe-js").ConfirmSofortPaymentData, options?: import("@stripe/stripe-js").ConfirmSofortPaymentOptions) => Promise<import("@stripe/stripe-js").PaymentIntentResult>;
        confirmTwintPayment: (clientSecret: string, data?: import("@stripe/stripe-js").ConfirmTwintPaymentData, options?: import("@stripe/stripe-js").ConfirmTwintPaymentOptions) => Promise<import("@stripe/stripe-js").PaymentIntentResult>;
        confirmWechatPayPayment: (clientSecret: string, data?: import("@stripe/stripe-js").ConfirmWechatPayPaymentData, options?: import("@stripe/stripe-js").ConfirmWechatPayPaymentOptions) => Promise<import("@stripe/stripe-js").PaymentIntentResult>;
        handleCardAction: (clientSecret: string) => Promise<import("@stripe/stripe-js").PaymentIntentResult>;
        handleNextAction: (options: {
            clientSecret: string;
        }) => Promise<import("@stripe/stripe-js").PaymentIntentOrSetupIntentResult>;
        verifyMicrodepositsForPayment: (clientSecret: string, data?: import("@stripe/stripe-js").VerifyMicrodepositsForPaymentData) => Promise<import("@stripe/stripe-js").PaymentIntentResult>;
        createRadarSession: () => Promise<import("@stripe/stripe-js").RadarSessionPayload>;
        collectBankAccountForPayment: (options: import("@stripe/stripe-js").CollectBankAccountForPaymentOptions) => Promise<import("@stripe/stripe-js").PaymentIntentResult>;
        createPaymentMethod: {
            (paymentMethodData: import("@stripe/stripe-js").CreatePaymentMethodData): Promise<import("@stripe/stripe-js").PaymentMethodResult>;
            (options: import("@stripe/stripe-js").CreatePaymentMethodFromElements): Promise<import("@stripe/stripe-js").PaymentMethodResult>;
            (options: import("@stripe/stripe-js").CreatePaymentMethodFromElement): Promise<import("@stripe/stripe-js").PaymentMethodResult>;
        };
        createConfirmationToken: (options: import("@stripe/stripe-js").CreateConfirmationToken) => Promise<import("@stripe/stripe-js").ConfirmationTokenResult>;
        retrievePaymentIntent: (clientSecret: string) => Promise<import("@stripe/stripe-js").PaymentIntentResult>;
        confirmSetup: {
            (options: {
                elements: import("@stripe/stripe-js").StripeElements;
                confirmParams?: Partial<import("@stripe/stripe-js").ConfirmSetupData>;
                redirect: "if_required";
            }): Promise<import("@stripe/stripe-js").SetupIntentResult>;
            (options: {
                elements?: import("@stripe/stripe-js").StripeElements;
                clientSecret: string;
                confirmParams?: Partial<import("@stripe/stripe-js").ConfirmSetupData>;
                redirect: "if_required";
            }): Promise<import("@stripe/stripe-js").SetupIntentResult>;
            (options: {
                elements: import("@stripe/stripe-js").StripeElements;
                confirmParams: import("@stripe/stripe-js").ConfirmSetupData;
                redirect?: "always";
            }): Promise<never | {
                error: import("@stripe/stripe-js").StripeError;
            }>;
            (options: {
                elements?: import("@stripe/stripe-js").StripeElements;
                clientSecret: string;
                confirmParams: import("@stripe/stripe-js").ConfirmSetupData;
                redirect?: "always";
            }): Promise<never | {
                error: import("@stripe/stripe-js").StripeError;
            }>;
        };
        confirmAcssDebitSetup: (clientSecret: string, data?: import("@stripe/stripe-js").ConfirmAcssDebitSetupData, options?: import("@stripe/stripe-js").ConfirmAcssDebitSetupOptions) => Promise<import("@stripe/stripe-js").SetupIntentResult>;
        confirmUsBankAccountSetup: (clientSecret: string, data?: import("@stripe/stripe-js").ConfirmUsBankAccountSetupData) => Promise<import("@stripe/stripe-js").SetupIntentResult>;
        confirmAuBecsDebitSetup: (clientSecret: string, data?: import("@stripe/stripe-js").ConfirmAuBecsDebitSetupData) => Promise<import("@stripe/stripe-js").SetupIntentResult>;
        confirmBacsDebitSetup: (clientSecret: string, data?: import("@stripe/stripe-js").ConfirmBacsDebitSetupData) => Promise<import("@stripe/stripe-js").SetupIntentResult>;
        confirmBancontactSetup: (clientSecret: string, data?: import("@stripe/stripe-js").ConfirmBancontactSetupData) => Promise<import("@stripe/stripe-js").SetupIntentResult>;
        confirmCardSetup: (clientSecret: string, data?: import("@stripe/stripe-js").ConfirmCardSetupData, options?: import("@stripe/stripe-js").ConfirmCardSetupOptions) => Promise<import("@stripe/stripe-js").SetupIntentResult>;
        confirmCashappSetup: (clientSecret: string, data?: import("@stripe/stripe-js").ConfirmCashappSetupData, options?: import("@stripe/stripe-js").ConfirmCashappSetupOptions) => Promise<import("@stripe/stripe-js").SetupIntentResult>;
        confirmIdealSetup: (clientSecret: string, data?: import("@stripe/stripe-js").ConfirmIdealSetupData) => Promise<import("@stripe/stripe-js").SetupIntentResult>;
        confirmPayPalSetup: (clientSecret: string, data?: import("@stripe/stripe-js").ConfirmPayPalSetupData) => Promise<import("@stripe/stripe-js").SetupIntentResult>;
        confirmSepaDebitSetup: (clientSecret: string, data?: import("@stripe/stripe-js").ConfirmSepaDebitSetupData) => Promise<import("@stripe/stripe-js").SetupIntentResult>;
        confirmSofortSetup: (clientSecret: string, data?: import("@stripe/stripe-js").ConfirmSofortSetupData, options?: import("@stripe/stripe-js").ConfirmSofortSetupOptions) => Promise<import("@stripe/stripe-js").SetupIntentResult>;
        confirmAffirmPayment: (clientSecret: string, data?: import("@stripe/stripe-js").ConfirmAffirmPaymentData, options?: import("@stripe/stripe-js").ConfirmAffirmPaymentOptions) => Promise<import("@stripe/stripe-js").PaymentIntentResult>;
        confirmAfterpayClearpayPayment: (clientSecret: string, data?: import("@stripe/stripe-js").ConfirmAfterpayClearpayPaymentData, options?: import("@stripe/stripe-js").ConfirmAfterpayClearpayPaymentOptions) => Promise<import("@stripe/stripe-js").PaymentIntentResult>;
        verifyMicrodepositsForSetup: (clientSecret: string, data?: import("@stripe/stripe-js").VerifyMicrodepositsForSetupData) => Promise<import("@stripe/stripe-js").SetupIntentResult>;
        collectBankAccountForSetup: (options: import("@stripe/stripe-js").CollectBankAccountForSetupOptions) => Promise<import("@stripe/stripe-js").SetupIntentResult>;
        retrieveSetupIntent: (clientSecret: string) => Promise<import("@stripe/stripe-js").SetupIntentResult>;
        processOrder: {
            (options: {
                elements: import("@stripe/stripe-js").StripeElements;
                confirmParams?: Partial<import("@stripe/stripe-js").ProcessOrderParams>;
                redirect: "if_required";
            }): Promise<import("@stripe/stripe-js").ProcessOrderResult>;
            (options: {
                elements: import("@stripe/stripe-js").StripeElements;
                confirmParams: import("@stripe/stripe-js").ProcessOrderParams;
                redirect?: "always";
            }): Promise<never | {
                error: import("@stripe/stripe-js").StripeError;
            }>;
        };
        retrieveOrder: (clientSecret: string) => Promise<import("@stripe/stripe-js").RetrieveOrderResult>;
        paymentRequest: (options: import("@stripe/stripe-js").PaymentRequestOptions) => import("@stripe/stripe-js").PaymentRequest;
        createToken: {
            (tokenType: import("@stripe/stripe-js").StripeIbanElement, data: import("@stripe/stripe-js").CreateTokenIbanData): Promise<import("@stripe/stripe-js").TokenResult>;
            (tokenType: import("@stripe/stripe-js").StripeCardElement | import("@stripe/stripe-js").StripeCardNumberElement, data?: import("@stripe/stripe-js").CreateTokenCardData): Promise<import("@stripe/stripe-js").TokenResult>;
            (tokenType: "pii", data: import("@stripe/stripe-js").CreateTokenPiiData): Promise<import("@stripe/stripe-js").TokenResult>;
            (tokenType: "bank_account", data: import("@stripe/stripe-js").CreateTokenBankAccountData): Promise<import("@stripe/stripe-js").TokenResult>;
            (tokenType: "cvc_update", element: import("@stripe/stripe-js").StripeCardCvcElement): Promise<import("@stripe/stripe-js").TokenResult>;
            (tokenType: "account", data: import("@stripe/stripe-js").TokenCreateParams.Account): Promise<import("@stripe/stripe-js").TokenResult>;
            (tokenType: "person", data: import("@stripe/stripe-js").TokenCreateParams.Person): Promise<import("@stripe/stripe-js").TokenResult>;
        };
        createSource: {
            (element: import("@stripe/stripe-js").StripeElement, sourceData: import("@stripe/stripe-js").CreateSourceData): Promise<import("@stripe/stripe-js").SourceResult>;
            (sourceData: import("@stripe/stripe-js").CreateSourceData): Promise<import("@stripe/stripe-js").SourceResult>;
        };
        retrieveSource: (source: import("@stripe/stripe-js").RetrieveSourceParam) => Promise<import("@stripe/stripe-js").SourceResult>;
        registerAppInfo: (wrapperLibrary: import("@stripe/stripe-js").WrapperLibrary) => void;
        verifyIdentity: (clientSecret: string) => Promise<import("@stripe/stripe-js").VerificationSessionResult>;
        collectFinancialConnectionsAccounts: (options: import("@stripe/stripe-js").CollectFinancialConnectionsAccountsOptions) => Promise<import("@stripe/stripe-js").FinancialConnectionsSessionResult>;
        collectBankAccountToken: (options: import("@stripe/stripe-js").CollectBankAccountTokenOptions) => Promise<import("@stripe/stripe-js").CollectBankAccountTokenResult>;
        createEphemeralKeyNonce: (options: import("@stripe/stripe-js").EphemeralKeyNonceOptions) => Promise<import("@stripe/stripe-js").EphemeralKeyNonceResult>;
        initCheckout: (options: import("@stripe/stripe-js").StripeCheckoutOptions) => import("@stripe/stripe-js").StripeCheckout;
        initEmbeddedCheckout: (options: import("@stripe/stripe-js").StripeEmbeddedCheckoutOptions) => Promise<import("@stripe/stripe-js").StripeEmbeddedCheckout>;
    } | null>;
    fetchPublishableKey(): Promise<void>;
    createPaymentIntent(amount: number): Promise<string>;
    fetchTransactions(): Promise<Transaction[]>;
}>;

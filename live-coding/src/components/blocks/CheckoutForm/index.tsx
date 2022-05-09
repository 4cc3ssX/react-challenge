import React, {
    FC,
    useCallback,
    useEffect,
    SyntheticEvent,
    ChangeEvent,
} from "react"
import useModels from "@packages/react-use-models"
import useValidator from "@packages/react-joi"
import Joi from "joi"
import {
    validateCardNumber,
    formatCardNumber,
    formatCardExpiry,
    validateCardExpiry,
    validateCardCVC,
    parseCardType,
    parseCardExpiry,
} from "creditcardutils"

// Styled Elements
import {
    Actions,
    Container,
    Fields,
    ErrorMessage,
    FieldControl,
    FieldLabel,
    Input,
    Form,
    FieldGroups,
    FieldsMerge,
    InputContainer,
    PayButton,
} from "./index.styled"

// Import InputIcons component and its icons
import { ReactComponent as CVVLogo } from "../../svgs/cvv-logo.svg"
import { InputIcons } from "./components"

type TypeCheckoutFormDefaultValues = {
    email: string | null
    card_number: string | null
    card_type: string | null
    card_expire: string | null
    cvv: string | null
}

export type TypeCheckoutFormValues = NonNullable<TypeCheckoutFormDefaultValues>

export interface CheckoutFormProps {
    onSuccess: (values: TypeCheckoutFormValues) => void
    loading?: boolean
    submitText?: string
}

const defaultState: TypeCheckoutFormDefaultValues = {
    email: null,
    card_number: null,
    card_type: null,
    card_expire: null,
    cvv: null,
}

const CheckoutForm: FC<CheckoutFormProps> = ({
    onSuccess,
    loading = false,
    submitText = "Submit",
}) => {
    const { models, register, updateModel } =
        useModels<TypeCheckoutFormDefaultValues>({
            defaultState,
        })
    const { state, setData } = useValidator({
        initialData: defaultState,
        schema: Joi.object({
            email: Joi.string()
                .email({
                    tlds: { allow: false },
                })
                .required()
                .messages({
                    "string.empty": "Required",
                    "string.email": "Must be a valid email",
                    "any.required": "Required",
                }),
            card_number: Joi.string()
                .custom((value, helpers) => {
                    if (value) {
                        if (!validateCardNumber(value)) {
                            return helpers.error("string.cardNumber")
                        }
                    }

                    return value
                })
                .required()
                .messages({
                    "string.empty": "Required",
                    "string.cardNumber": "Must be a valid card",
                    "any.required": "Required",
                }),
            card_expire: Joi.string()
                .custom((value, helpers) => {
                    if (value) {
                        const { month, year } = parseCardExpiry(
                            models.card_expire
                        )
                        if (!validateCardExpiry(month, year)) {
                            return helpers.error("string.expiry")
                        }
                    }

                    return value
                })
                .required()
                .messages({
                    "string.empty": "Required",
                    "string.expiry": "Must be a valid expiry",
                    "any.required": "Required",
                }),
            cvv: Joi.string()
                .length(3)
                .custom((value, helpers) => {
                    if (value) {
                        if (!validateCardCVC(value, models.card_type)) {
                            return helpers.error("string.cvv")
                        }
                    }

                    return value
                })
                .required()
                .messages({
                    "string.empty": "Required",
                    "string.cvv": "Must be a valid CVV",
                    "string.length": "Maximum 3 digits",
                    "any.required": "Required",
                }),
        }),
    })

    const getErrors = useCallback(
        (field) => {
            return state.$errors[field]
                .map((data: any) => data.$message)
                .join(",")
        },
        [state.$errors]
    )

    const onSubmit = (e: SyntheticEvent) => {
        e.preventDefault()

        onSuccess(state.$data)
    }

    const formatter = {
        cardNumber: (e: ChangeEvent<HTMLInputElement>) => {
            const value = formatCardNumber(e.target.value)
            const cardType = parseCardType(value)
            updateModel("card_type", cardType)
            updateModel("card_number", value)
        },
        cardExpire: (e: ChangeEvent<HTMLInputElement>) => {
            const value = formatCardExpiry(e.target.value)

            updateModel("card_expire", value)
        },
    }

    // Sync model <-> validator
    useEffect(() => {
        setData(models)
    }, [models])

    return (
        <Container>
            <Form onSubmit={onSubmit}>
                <Fields>
                    <FieldControl>
                        <FieldLabel error={!!getErrors("email")}>
                            Email
                        </FieldLabel>

                        <Input
                            {...register.input({ name: "email" })}
                            type="email"
                            placeholder="you@company.com"
                            autoComplete="current-email"
                        />
                    </FieldControl>

                    {getErrors("email") && (
                        <ErrorMessage>{getErrors("email")}</ErrorMessage>
                    )}
                </Fields>

                <FieldGroups>
                    <Fields>
                        <FieldControl>
                            <FieldLabel error={!!getErrors("card_number")}>
                                Card information
                            </FieldLabel>

                            <InputContainer>
                                <Input
                                    {...register.input({
                                        name: "card_number",
                                        onChange: formatter.cardNumber,
                                    })}
                                    type="text"
                                    placeholder="1234 1234 1234 1234"
                                />
                                <InputIcons activeIconName={models.card_type} />
                            </InputContainer>
                        </FieldControl>

                        {getErrors("card_number") && (
                            <ErrorMessage>
                                {getErrors("card_number")}
                            </ErrorMessage>
                        )}
                    </Fields>

                    <FieldsMerge>
                        <Fields>
                            <Input
                                {...register.input({
                                    name: "card_expire",
                                    onChange: formatter.cardExpire,
                                })}
                                type="text"
                                placeholder="MM / YY"
                            />

                            {getErrors("card_expire") && (
                                <ErrorMessage>
                                    {getErrors("card_expire")}
                                </ErrorMessage>
                            )}
                        </Fields>

                        <Fields>
                            <InputContainer>
                                <Input
                                    {...register.input({ name: "cvv" })}
                                    type="text"
                                    placeholder="123"
                                />
                                <InputIcons
                                    items={[
                                        {
                                            Logo: CVVLogo,
                                            name: "cvv",
                                            backgroundColor: "transparent",
                                        },
                                    ]}
                                />
                            </InputContainer>
                            {getErrors("cvv") && (
                                <ErrorMessage>{getErrors("cvv")}</ErrorMessage>
                            )}
                        </Fields>
                    </FieldsMerge>
                </FieldGroups>

                <Actions>
                    <PayButton type="submit" disabled={state.$auto_invalid || loading}>
                        {submitText}
                    </PayButton>
                </Actions>
            </Form>
        </Container>
    )
}

export default CheckoutForm

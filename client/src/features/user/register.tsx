import { Input } from "../../components/input"
import { useForm } from "react-hook-form"
import { Button, Link } from "@nextui-org/react"
import { useRegisterMutation } from "../../app/services/userApi"
import { hasErrorField } from "../../utils/has-error-field"
import { useState } from "react"
import { ErrorMessage } from "../../components/error-message"

type Register = {
  email: string
  name: string
  password: string
}

type Props = {
  setSelected: (value: string) => void
}

export const Register = ({ setSelected }: Props) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Register>({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  })

  const [register] = useRegisterMutation()
  const [error, setError] = useState("")

  const onSubmit = async (data: Register) => {
    try {
      await register(data).unwrap()
      setSelected("login")
    } catch (err) {
      if (hasErrorField(err)) {
        setError(err.data.error)
      }
    }
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Input
        control={control}
        required="Обов'язкове поле"
        label="Ім'я"
        name="name"
      />
      <Input
        control={control}
        name="email"
        label="Пошта"
        type="email"
        required="Обов'язкове поле"
      />
      <Input
        control={control}
        name="password"
        label="Пароль"
        type="password"
        required="Обов'язкове поле"
      />
     <ErrorMessage error={error} />

      <p className="text-center text-small">
        Ви вже маєте акаунт?{" "}
        <Link
          size="sm"
          className="cursor-pointer"
          onPress={() => setSelected("login")}
        >
          Увійдіть
        </Link>
      </p>
      <div className="flex gap-2 justify-end">
        <Button fullWidth color="primary" type="submit">
          Зареєструватися
        </Button>
      </div>
    </form>
  )
}
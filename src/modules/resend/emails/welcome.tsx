// External packages
import { Text, Heading, Row, Column } from "@react-email/components"
import { CustomerDTO } from "@medusajs/framework/types"

// Components
import EmailLayout, { EmailLayoutProps } from "./components/EmailLayout"

const UnorderedList: React.FC<{
  children?: React.ReactNode
  className?: string
}> = ({ children, className }) => (
  <Row className={["align-top", className].filter(Boolean).join(" ")}>
    <Column className="pl-6">{children}</Column>
  </Row>
)

const UnorderedListItem: React.FC<{
  children?: React.ReactNode
  className?: string
  textClassName?: string
}> = ({ children, className, textClassName }) => (
  <ul
    role="presentation"
    className={["list-disc mt-0 mb-0 p-0", className]
      .filter(Boolean)
      .join(" ")}
  >
    <li role="listitem" className="m-0 p-0">
      <span className={textClassName}>{children}</span>
    </li>
  </ul>
)

type Props = {
  customer: Pick<CustomerDTO, "id" | "email" | "first_name" | "last_name">
}

export default function WelcomeEmail({
  customer,
  ...emailLayoutProps
}: Props & EmailLayoutProps) {
  return (
    <EmailLayout {...emailLayoutProps}>
      <Heading className="text-2xl mt-0 mb-10 font-medium">
        Welcome to TimeLib, {customer.first_name} 👋
      </Heading>

      <Text className="text-md !mb-8">
        Welcome to TimeLib — where buying a quality watch feels safe, simple,
        and stylish.
      </Text>

      <Text className="text-md !mb-8">
        We’re excited to have you with us. At TimeLib, we believe a watch should
        do more than tell time — it should reflect confidence, authenticity,
        and personal style.
      </Text>

      <Text className="text-md font-semibold !mb-8">
        Here’s what you can expect from us:
      </Text>

      <UnorderedList className="mb-8">
        <UnorderedListItem className="text-md">
          Authentic, well-crafted watches — exactly as shown
        </UnorderedListItem>
        <UnorderedListItem className="text-md">
          Clear communication and transparent pricing
        </UnorderedListItem>
        <UnorderedListItem className="text-md">
          Pay on delivery for peace of mind
        </UnorderedListItem>
        <UnorderedListItem className="text-md">
          Reliable support before and after your purchase
        </UnorderedListItem>
      </UnorderedList>

      <Text className="text-md !mb-8">
        Take your time, explore our collection, and choose a watch that fits
        your lifestyle.
      </Text>

      <Text className="text-md">
        Stay confident,
        <br />
        <strong>The TimeLib Team</strong>
      </Text>
    </EmailLayout>
  )
}

WelcomeEmail.PreviewProps = {
  customer: {
    id: "1",
    email: "example@timelib.com",
    first_name: "John",
    last_name: "Doe",
  },
} satisfies Props

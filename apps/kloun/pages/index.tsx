import { Button } from '@acme/ui'
import { Code, Layout, List, Page, Text } from '@vercel/examples-ui'
import { useState } from 'react'
//import { matchingTextColor, randomColor } from '@acme/utils'

export default function Index() {
  const [bgColor, setBgColor] = useState('')
  const [textColor, setTextColor] = useState('')
 

  return (
    <Page>
      <Text variant="h1" className="mb-6">
        kloun
      </Text>
      <Text className="mb-4">
        In this monorepo app we have a single site with two installed
        dependencies that are available in the same repository.
      </Text>
      <List className="mb-4">
        <li>
          <Code>app</Code> is the current Next.js site you&apos;re looking at
        </li>
        <li>
          <Code>packages/ui</Code> is a package that exports the button you see
          below
        </li>
        <li>
          <Code>packages/utils</Code> is a package that exports a function that
          generates random colors. Click the button to see it in action
        </li>
      </List>
      {bgColor && textColor && (
        <>
          <Button
            style={{
              backgroundColor: bgColor,
              color: textColor,
              borderColor: textColor,
            }}
         
          >
            Change Color
          </Button>
        </>
      )}
    </Page>
  )
}

Index.Layout = Layout

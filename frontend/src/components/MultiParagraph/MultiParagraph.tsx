import Typography, { TypographyProps } from '@mui/material/Typography'

type Props = {
  text: string
  TypographyProps?: TypographyProps
}

const MultiParagraph = (props: Props) => {
  return (
    <>
      {props.text.split('\n').map(
        (paragraph, index) =>
          !!paragraph && (
            <Typography key={index} paragraph {...props.TypographyProps}>
              {paragraph}
            </Typography>
          )
      )}
    </>
  )
}

export default MultiParagraph

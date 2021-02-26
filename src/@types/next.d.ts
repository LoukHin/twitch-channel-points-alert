import 'next'

declare module 'next' {
    type User = {
        id: number
        display_name: string
        profile_image_url: string
    }

    type GetServerSidePropsContextWithUser = GetServerSidePropsContext & {
        req: GetServerSidePropsContext['req'] & {
            user?: User
        }
    }
    type GetServerSidePropsWithUser<
        P extends { [key: string]: any } = { [key: string]: any },
        Q extends ParsedUrlQuery = ParsedUrlQuery
    > = (
        context: GetServerSidePropsContextWithUser<Q>
    ) => Promise<GetServerSidePropsResult<P>>
}

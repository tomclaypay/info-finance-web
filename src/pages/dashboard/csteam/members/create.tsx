import { useMutation } from '@apollo/client'
import { AuthGuard } from '@app/components/authentication/auth-guard'
import CreateEditCsMemberSection from '@app/components/dashboard/csteam/member/member-section/create-edit-member-section'
import { DashboardLayout } from '@app/components/dashboard/dashboard-layout'
import { FormActions } from '@app/constants/common'
import { User } from '@app/interfaces/user'
import { gtm } from '@app/lib/gtm'
import CREATE_CS_MEMBER from '@app/operations/mutations/csteam/members/create-cs-member'
// import CREATE_CS_MEMBER from '@app/operations/mutations/csteam/members/create-cs-member'
import CREATE_ADMIN_USER from '@app/operations/mutations/users/admin-create-user'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'
import toast from 'react-hot-toast'

const UserCreate = () => {
  const [adminCreateUser] = useMutation(CREATE_ADMIN_USER)
  const [createCsMember] = useMutation(CREATE_CS_MEMBER)
  const router = useRouter()

  const handleCsMemberFormSubmit = async (formValues: Partial<User>) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirmPassword, ...other } = formValues
      const data = await adminCreateUser({
        variables: {
          ...other,
        },
      })
      if (data?.data?.adminCreateUser?.data?.id) {
        await createCsMember({
          variables: {
            user_id: data?.data?.adminCreateUser?.data?.id,
          },
        })
        toast.success('Tạo Cs member thành công!')
        router.push('/dashboard/csteam/members')
      }
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    gtm.push({ event: 'page_view' })
  }, [])

  return (
    <>
      <Head>
        <title>Dashboard: Tạo người dùng | InfoFX</title>
      </Head>
      <CreateEditCsMemberSection
        page="0"
        limit="10"
        type={FormActions.CREATE}
        handleCsMemberFormSubmit={handleCsMemberFormSubmit}
      />
    </>
  )
}

UserCreate.getLayout = (page: ReactElement) => (
  <AuthGuard authorized>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
)

export default UserCreate

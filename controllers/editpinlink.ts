import prisma from 'lib/prisma'
import { TUser } from 'types/user'

export const updateDraftPinLink = async (userId: string, userData: TUser) => {
  await prisma.pinLinkDraft.updateMany({
    where: { userId },
    data: {
      username: userData.username || undefined,
      name: userData.name || undefined,
      description: userData.description || undefined,
      pfp: userData.pfp || undefined,
      blurpfp: userData.blurpfp || undefined,
      theme: userData.theme || undefined,
      customFont: userData.customFont || undefined,
      customColor: userData.customColor || undefined,
      redirectLink: userData.redirectLink || undefined,
      shouldRedirect: userData.shouldRedirect || false,
      links: (userData.links as any) || undefined,
      icons: userData.icons || undefined,
    },
  })
}

export const syncDraftToProd = async (userId: string) => {
  const draftData = await prisma.pinLinkDraft.findFirst({
    where: { userId },
  })

  if (draftData) {
    await prisma.pinLinkProd.updateMany({
      where: { userId },
      data: {
        username: draftData.username,
        name: draftData.name,
        description: draftData.description,
        pfp: draftData.pfp,
        blurpfp: draftData.blurpfp,
        theme: draftData.theme,
        customFont: draftData.customFont,
        customColor: draftData.customColor,
        redirectLink: draftData.redirectLink,
        shouldRedirect: draftData.shouldRedirect,
        links: draftData.links || undefined,
        icons: draftData.icons || undefined,
      },
    })
  }
}

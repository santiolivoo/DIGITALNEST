import { cookies } from 'next/headers';
import { verifyToken } from './jwt';
import prisma from './prisma';

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get('authToken')?.value;
  
  if (!token) return null;

  try {
    const userId = verifyToken(token);
    
    if (!userId) return null;

    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    return user;
  } catch (error) {
    console.error('Error obteniendo usuario:', error);
    return null;
  }
}
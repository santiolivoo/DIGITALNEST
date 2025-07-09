-- AlterTable
ALTER TABLE "Tienda" ADD COLUMN     "color" TEXT,
ADD COLUMN     "modulos" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "tipoNegocio" TEXT;

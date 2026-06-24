import {
  getSlices,
  SliceSimulator,
  type SliceSimulatorParams,
} from '@prismicio/next'
import { SliceZone } from '@prismicio/react'
import { components } from '@/slices'

export default async function SliceSimulatorPage({
  searchParams,
}: Readonly<SliceSimulatorParams>) {
  const { state } = await searchParams
  const slices = getSlices(state)

  return (
    <SliceSimulator className="bg-black!">
      <SliceZone slices={slices} components={components} />
    </SliceSimulator>
  )
}

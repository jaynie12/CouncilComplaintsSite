import { createColumnHelper } from '@tanstack/react-table'
import { CaseList } from './listOfCases.tsx'
import { Cases } from './data.ts'
import { EditCell } from './editCell.tsx'
import React from 'react'


const columnHelper = createColumnHelper<Cases>()

export const columns = [

  columnHelper.accessor('id', {
    header: 'Case Id',
    cell: CaseList,
    meta: {
      type: 'number',
      readonly: true,
    },
  }),
  columnHelper.accessor('case_short_description', {
    header: 'Case Short Description',
    cell: CaseList,
    meta: {
      type: 'text',
      required: true,
      pattern: '^[a-zA-Z ]+$',
      readonly:true,
    },
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: CaseList,
    meta: {
      type: 'select', 
      options: [
        { value: '', label: 'Select' },
        { value: 'Not Assigned', label: 'Not Assigned' },
        { value: 'In progress', label: 'In progress' },
        { value: 'Complete', label: 'Complete' },
        { value: 'Cancelled', label: 'Cancelled' },
      ],    }
  }),
    columnHelper.accessor('staff_assigned', {
        header: 'Staff Assigned',
        cell: CaseList,
        meta: {
        type: 'text',
        readonly:true,
        },
    }),
    columnHelper.accessor('name', {
        header: 'User Name',
        cell: CaseList,
        meta: {
        type: 'text',
        required: true,
        pattern: '^[a-zA-Z ]+$',
        readonly:true,
        },
    }),
    columnHelper.accessor('email', {
        header: 'User Email',
        cell: CaseList,
        meta: {
        type: 'text',
        required: true,
        pattern: '^[a-zA-Z ]+$',
        readonly:true,
        },
    }),
    columnHelper.accessor('comments', {
        header: 'Comments',
        cell: CaseList,
        meta: {
        type: 'text',
        required: true,
        pattern: '^[a-zA-Z ]+$',
        readonly:false,
        },
    }),
    
  columnHelper.display({
    id: 'edit',
    cell: EditCell,
  }),


]
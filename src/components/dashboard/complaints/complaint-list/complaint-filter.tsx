import { SortOptions } from '@app/constants/common'
import { useAuth } from '@app/hooks/use-auth'
import { Option } from '@app/interfaces/common'
import { ComplaintFilters } from '@app/pages/dashboard/complaints'
import FilterListIcon from '@mui/icons-material/FilterList'
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material'
import { Stack } from '@mui/system'
import { ChangeEvent, forwardRef, ReactNode, SyntheticEvent } from 'react'
import InputField from '../../common/form-fields/input-field'
import SelectField from '../../common/form-fields/select-field'

interface ComplaintFilterProps {
  filters: ComplaintFilters
  statusOptions?: Option[]
  exchangeOptions?: Option[]
  csTeamOptions?: Option[]
  handleByOptions?: Option[]
  categoryOptions?: Option[]
  onChangeHiddenComplaint?: (complaintId: string) => void
  onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void
  onStatusChange: (event: SelectChangeEvent<string>, child: ReactNode) => void
  onCsTeamChange: (event: any) => void
  onExchangeChange: (event: any) => void
  onCategoryChange: (event: SelectChangeEvent<string>, child: ReactNode) => void
  onSortChange: (event: SelectChangeEvent<string>, child: ReactNode) => void
  onHandleByChange: (event: any) => void
  onCancelRequestStatusChange: (event: SyntheticEvent<Element, Event>, checked: boolean) => void
  onUnHandledByStatusChange: (event: SyntheticEvent<Element, Event>, checked: boolean) => void
  onHighlightChange: (event: SyntheticEvent<Element, Event>, checked: boolean) => void
  onClearFilters: () => void
  initialSearch?: any
}

function ComplaintFilter(props: ComplaintFilterProps) {
  const {
    filters,
    statusOptions,
    exchangeOptions,
    csTeamOptions,
    categoryOptions,
    onSearchChange,
    onStatusChange,
    onCsTeamChange,
    onExchangeChange,
    onCategoryChange,
    onSortChange,
    onHandleByChange,
    onCancelRequestStatusChange,
    onUnHandledByStatusChange,
    onHighlightChange,
    onClearFilters,
    initialSearch,
    handleByOptions,
  } = props

  const { status, sort, category } = filters

  const auth = useAuth()

  return (
    <Box
      sx={{
        m: -1.5,
        p: 3,
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <InputField
            fullWidth
            label="Tìm kiếm khiếu nại"
            defaultValue={initialSearch?.complaintTile}
            onChange={onSearchChange}
          />
        </Grid>
        <Grid item xs={12} md={1.8}>
          {/* {categoryOptions && (
            <SelectField
              name="csTeam"
              options={csTeamOptions}
              label="Cs Team"
              value={csTeam}
              onChange={onCsTeamChange}
            />
          )} */}
          {categoryOptions && (
            <Autocomplete
              id="tags-outlined"
              fullWidth
              options={csTeamOptions || []}
              getOptionLabel={(item: any) => item?.label || ''}
              filterSelectedOptions
              renderInput={(params) => <TextField {...params} label="Cs Team" />}
              onChange={(event, newValue) => {
                onCsTeamChange(newValue)
              }}
            />
          )}
        </Grid>
        <Grid item xs={12} md={1.8}>
          {/* {categoryOptions && (
            <SelectField
              name="handle_by"
              options={handleByOptions}
              label="Người xử lý"
              value={handle_by}
              onChange={onHandleByChange}
            />
          )} */}
          {categoryOptions && (
            <Autocomplete
              id="tags-outlined"
              fullWidth
              options={handleByOptions || []}
              getOptionLabel={(item: any) => item?.label || ''}
              filterSelectedOptions
              defaultValue={{
                value: initialSearch.handleById,
                label: initialSearch.displayName,
              }}
              renderInput={(params) => <TextField {...params} label="Người xử lý" />}
              onChange={(event, newValue) => {
                onHandleByChange(newValue)
              }}
            />
          )}
        </Grid>
        <Grid item xs={12} md={1.8}>
          {categoryOptions && (
            <SelectField
              name="category"
              options={categoryOptions}
              label="Loại khiếu nại"
              value={category}
              onChange={onCategoryChange}
            />
          )}
        </Grid>
        <Grid item xs={12} md={1.8}>
          {/* {exchangeOptions && (
            <SelectField
              name="exchange"
              options={exchangeOptions}
              label="Sàn"
              value={exchange}
              onChange={onExchangeChange}
            />
          )} */}

          {exchangeOptions && (
            <Autocomplete
              id="tags-outlined"
              fullWidth
              options={exchangeOptions || []}
              getOptionLabel={(item: any) => item?.label || ''}
              filterSelectedOptions
              defaultValue={{
                value: initialSearch.exchangeId,
                label: initialSearch.exchangeName,
              }}
              renderInput={(params) => <TextField {...params} label="Sàn" />}
              onChange={(event, newValue) => {
                onExchangeChange(newValue)
              }}
            />
          )}
        </Grid>
        <Grid item xs={12} md={1.8}>
          {statusOptions && (
            <SelectField
              name="status"
              options={statusOptions}
              label="Trạng thái"
              value={status}
              onChange={onStatusChange}
            />
          )}
        </Grid>
        <Grid item xs={12} md={1.8}>
          {SortOptions && (
            <SelectField
              name="sort"
              options={SortOptions}
              label="Sắp xếp"
              value={sort}
              all={false}
              onChange={onSortChange}
            />
          )}
        </Grid>
        <Grid item xs={12} md={12}>
          <Stack direction="row" justifyContent="space-between">
            <FormGroup>
              <Stack direction="row" spacing={5}>
                <FormControlLabel
                  control={<Checkbox />}
                  label={<Typography fontWeight={600}>Khiếu nại đang có yêu cầu huỷ</Typography>}
                  checked={filters.showCancelRequest}
                  onChange={onCancelRequestStatusChange}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label={<Typography fontWeight={600}>Khiếu nại chưa có người xử lý</Typography>}
                  checked={filters.showUnHandedBy}
                  onChange={onUnHandledByStatusChange}
                />
                {auth?.user?.role === 'super_admin' && (
                  <FormControlLabel
                    control={<Checkbox />}
                    label={<Typography fontWeight={600}>Khiếu nại nổi bật ở trang sàn</Typography>}
                    checked={filters.showHighlight}
                    onChange={onHighlightChange}
                  />
                )}
              </Stack>
            </FormGroup>
            <Button variant="outlined" startIcon={<FilterListIcon />} onClick={onClearFilters}>
              Xoá bộ lọc
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  )
}

export default forwardRef(ComplaintFilter)

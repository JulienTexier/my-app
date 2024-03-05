import { Trans } from '@lingui/macro';
import { StyleSheet, View } from 'react-native';

import { Stack, Text } from '~components/uikit';
import { useFinanceStore } from '~services/store';
import { styled } from '~styles';

export default function Home() {
  const {
    getTotalMonthlyExpenses,
    getTotalMonthlyIncomes,
    getTotalMonthlySavings,
  } = useFinanceStore();

  const getRoundedValue = (value: number) => Math.round(value * 100) / 100;

  return (
    <Wrapper testID="homeScreen">
      <Stack axis="y" spacing="large">
        <Text variant="title2">
          <Trans>Overview</Trans>
        </Text>
        <Stack axis="y" spacing="normal">
          <Text variant="title3">
            <Trans>Income</Trans>
          </Text>
          <Text variant="title3">
            {getRoundedValue(getTotalMonthlyIncomes())} €
          </Text>
        </Stack>
        <Stack axis="y" spacing="normal">
          <Text variant="title3">
            <Trans>Expenses</Trans>
          </Text>
          <Text variant="title3">
            {getRoundedValue(getTotalMonthlyExpenses())} €
          </Text>
        </Stack>
        <Stack axis="y" spacing="normal">
          <Text variant="title3">
            <Trans>Savings</Trans>
          </Text>
          <Text variant="title3">
            {getRoundedValue(getTotalMonthlySavings())} €
          </Text>
        </Stack>

        <Stack axis="y" spacing="normal">
          <Text variant="title3">
            <Trans>Liquidity</Trans>
          </Text>
          <Text variant="title3">
            {getRoundedValue(
              getTotalMonthlyIncomes() -
                getTotalMonthlyExpenses() -
                getTotalMonthlySavings()
            )}{' '}
            €
          </Text>
        </Stack>
      </Stack>

      {/* Give a total of expenses */}
    </Wrapper>
  );
}

const Wrapper = styled('View', {
  flex: 1,
  padding: '$normal',
});

function Row({
  column,
}: {
  column: {
    account: string;
    item: string;
    dueDate: string;
    amount: string;
  };
}) {
  return (
    <View style={styles.rowStyle}>
      <Cell data={column.account} />
      <Cell data={column.item} />
      <Cell data={column.dueDate} />
      <Cell data={column.amount} />
    </View>
  );
}

function Cell({ data }) {
  console.log(`>> Here is the data: ${data}`);
  return (
    <View style={styles.cellStyle}>
      <Text>{data}</Text>
    </View>
  );
}

function Grid({
  data,
}: {
  data: { account: string; item: string; dueDate: string; amount: string }[];
}) {
  return (
    <View style={styles.gridContainer}>
      {data.map((column, index) => (
        <Row column={column} key={index} />
      ))}
    </View>
  );
}
const styles = StyleSheet.create({
  gridContainer: {
    width: 350,
  },
  rowStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  cellStyle: {
    flex: 1,
    margin: 10,
  },
});

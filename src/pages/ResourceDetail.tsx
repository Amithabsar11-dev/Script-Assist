import {
  Card,
  Title,
  Text,
  Badge,
  Grid,
  Loader,
  Group,
  Divider,
  Container,
  Space,
  Paper,
  Image,
  Stack,
} from "@mantine/core";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Launch, Rocket } from "../types";

const fetchLaunch = async (id: string): Promise<Launch> => {
  const res = await fetch(`https://api.spacexdata.com/v4/launches/${id}`);
  if (!res.ok) throw new Error("Failed to fetch launch data");
  return res.json();
};

const fetchRocket = async (id: string): Promise<Rocket> => {
  const res = await fetch(`https://api.spacexdata.com/v4/rockets/${id}`);
  if (!res.ok) throw new Error("Failed to fetch rocket data");
  return res.json();
};

const ResourceDetail = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: launch,
    isLoading: isLaunchLoading,
    error: launchError,
  } = useQuery<Launch>(["launch", id], () => fetchLaunch(id!), {
    enabled: !!id,
  });

  const {
    data: rocket,
    isLoading: isRocketLoading,
    error: rocketError,
  } = useQuery<Rocket>(
    ["rocket", launch?.rocket],
    () => fetchRocket(launch!.rocket),
    { enabled: !!launch?.rocket }
  );

  if (isLaunchLoading || isRocketLoading) {
    return (
      <Container
        fluid
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Loader size="xl" />
      </Container>
    );
  }
  if (launchError || rocketError)
    return <Text color="red">Failed to load data.</Text>;
  if (!launch || !rocket)
    return <Text color="red">Launch or rocket data missing.</Text>;

  return (
    <Container size="lg" py="md">
      <Card
        shadow="md"
        radius="md"
        withBorder
        p="xl"
        style={{ backgroundColor: "#f9fafb" }}
      >
        <Stack spacing="xl">
          <Group position="apart">
            <Title order={2} style={{ color: "#1a202c" }}>
              {launch.name}
            </Title>
            <Badge
              color={launch.success ? "green" : "red"}
              size="lg"
              variant="filled"
            >
              {launch.success ? "Success" : "Failure"}
            </Badge>
          </Group>

          <Text color="dimmed" size="sm">
            {new Date(launch.date_utc).toLocaleString()}
          </Text>

          {launch.links.patch.small && (
            <Image
              src={launch.links.patch.small}
              alt="Mission Patch"
              width={100}
              height={100}
              radius="md"
              fit="contain"
            />
          )}

          <Divider my="sm" />

          <Text size="md" style={{ lineHeight: 1.6 }}>
            {launch.details || "No launch details available."}
          </Text>

          <Divider label="Rocket Info" labelPosition="center" my="lg" />

          <Paper withBorder radius="md" p="md" shadow="xs">
            <Grid gutter="md">
              <Grid.Col xs={12} sm={6}>
                <Text weight={600}>Name:</Text>
                <Text color="dimmed">{rocket.name}</Text>
              </Grid.Col>
              <Grid.Col xs={12} sm={6}>
                <Text weight={600}>Type:</Text>
                <Text color="dimmed">{rocket.type}</Text>
              </Grid.Col>
              <Grid.Col span={12}>
                <Text weight={600} mb={4}>
                  Description:
                </Text>
                <Text size="sm" color="dimmed" style={{ lineHeight: 1.6 }}>
                  {rocket.description}
                </Text>
              </Grid.Col>
              <Grid.Col span={12}>
                <Text weight={600}>First Flight:</Text>
                <Text color="dimmed">{rocket.first_flight}</Text>
              </Grid.Col>
              <Grid.Col xs={6}>
                <Text weight={600}>Stages:</Text>
                <Text color="dimmed">{rocket.stages}</Text>
              </Grid.Col>
              <Grid.Col xs={6}>
                <Text weight={600}>Boosters:</Text>
                <Text color="dimmed">{rocket.boosters}</Text>
              </Grid.Col>
            </Grid>
          </Paper>
        </Stack>
        <Space h="xl" />
      </Card>
    </Container>
  );
};

export default ResourceDetail;

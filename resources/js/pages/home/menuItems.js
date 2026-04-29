import { uniqueId } from 'lodash';
import {
  IconPoint,
  IconMessage2,
  IconSparkles,
} from '@tabler/icons-react';

const menuItems =
  [
    {
      navlabel: true,
      subheader: 'Apps',
    },
    {
      id: uniqueId(),
      title: "Settings",
      icon: IconSparkles,
      // href: "/apps/chat-ai/",
      children: [
        {
          id: uniqueId(),
          title: "Currency",
          icon: IconPoint,
          href: "/tree/currency",
        },
        {
          id: uniqueId(),
          title: "Meal",
          icon: IconPoint,
          href: "/tree/meal",
        },
        {
          id: uniqueId(),
          title: "Ledger",
          icon: IconPoint,
          href: "/tree/ledger",
        },
      ],
    },
    {
      id: uniqueId(),
      title: 'Chats',
      icon: IconMessage2,
      href: '/tree/ledger2',
    },
  ];

export default menuItems;
